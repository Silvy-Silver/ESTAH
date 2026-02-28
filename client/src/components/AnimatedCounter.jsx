import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const AnimatedCounter = ({ value, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = parseInt(value.toString().replace(/,/g, ''), 10);
            if (isNaN(end)) return;

            const totalMilSecDur = parseInt(duration) * 1000;
            const incrementTime = (totalMilSecDur / end) * 2;

            // if number is too large, we do larger steps
            const step = end > 100 ? Math.ceil(end / 100) : 1;

            const timer = setInterval(() => {
                start += step;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(start);
                }
            }, Math.max(incrementTime, 20)); // min 20ms to avoid freezing browser
        }
    }, [value, duration, isInView]);

    return (
        <span ref={ref} className="tabular-nums">
            {count.toLocaleString()}{suffix}
        </span>
    );
};

export default AnimatedCounter;
