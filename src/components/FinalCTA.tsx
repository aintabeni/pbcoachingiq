import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export const FinalCTA = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const navigate = useNavigate();

  const paragraphs = [
    "You can keep training harder.\nOr you can start training smarter.",
    "The players who think faster will always play better.\nThe next move is yours.",
  ];

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 md:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-foreground"
        >
          Take Control of the Game
        </motion.h2>

        <div className="space-y-6 text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.15 }}
              className="whitespace-pre-line"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center max-w-md mx-auto"
        >
          <InteractiveHoverButton
            text="Start Your Training"
            onClick={() => navigate("/apply")}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
