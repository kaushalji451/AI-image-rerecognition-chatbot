import { motion } from "framer-motion";

const data = [
    { icon: "🧠", title: "Advanced AI", desc: "Powered by ML algorithms for accurate object detection" },
    { icon: "⚡", title: "Lightning Fast", desc: "Get results in seconds with our optimized pipeline" },
    { icon: "🎯", title: "High Accuracy", desc: "Detect hundreds of objects with confidence scores" },
];
const Features = () => {
    return (
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
            {data.map((feature, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, type: "spring", stiffness: 80 }}
                    className="bg-white/80 rounded-2xl p-6 text-center shadow-2xl backdrop-blur hover:scale-105 transition-transform"
                >
                    <div className="text-5xl mb-3">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-700">{feature.desc}</p>
                </motion.div>
            ))}
        </div>
    )
}

export default Features
