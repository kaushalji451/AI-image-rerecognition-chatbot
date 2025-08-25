import React, { useMemo } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Loader from "../Loader";

export default function ImageResponse({
  responseText,
  score,
}: {
  responseText?: string;
  score?: string;
}) {
  console.log("got the response", responseText);
  console.log("got the score", score);
  const content = responseText?.trim().length
    ? responseText!
    : "No response text provided. Please upload an image to get a description.";

  // Normalize markdown
  const normalized = useMemo(() => {
    const lines = content.split(/\r?\n/);
    return (
      lines
        .map((line) => {
          const trimmed = line.trimStart();

          const listHeading = /^-\s*\*\*(.+?)\*\*\s*:\s*(.*)$/i.exec(trimmed);
          if (listHeading) {
            const heading = listHeading[1].trim();
            const rest = listHeading[2].trim();
            return `\n### ${heading}\n${rest ? `- ${rest}` : ""}`.trim();
          }

          const paraHeading = /^\*\*(.+?)\*\*\s*:\s*(.*)$/i.exec(trimmed);
          if (paraHeading) {
            const heading = paraHeading[1].trim();
            const rest = paraHeading[2].trim();
            return `\n### ${heading}\n${rest}`.trim();
          }

          const onlyBold = /^\*\*(.+?)\*\*$/.exec(trimmed);
          if (onlyBold) {
            return `\n### ${onlyBold[1].trim()}`;
          }

          return line;
        })
        .join("\n")
        .replace(/^(the\s+)?\*\*(.+?)\*\*/i, ( _g1, g2) => `# ${g2}`)
    );
  }, [content]);

  // Animation configs
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 16 },
    },
  } as const;

  // ✅ Motion wrappers for markdown
  const MotionH1 = (props: any) => <motion.h1 variants={item} {...props} />;
  const MotionH2 = (props: any) => (
    <motion.h2 variants={item} className="mt-6 sm:mt-8" {...props} />
  );
  const MotionH3 = (props: any) => (
    <motion.h3 variants={item} className="mt-4 sm:mt-6" {...props} />
  );
  const MotionP = (props: any) => <motion.p variants={item} {...props} />;
  const MotionLi = (props: any) => <motion.li variants={item} {...props} />;
  const MotionHr = (props: any) => (
    <motion.hr variants={item} className="my-4 sm:my-6 border-white/20" {...props} />
  );  

    if(!responseText){
     return <Loader/>
    }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="rounded-xl sm:rounded-2xl bg-white/10 shadow-xl ring-1 ring-white/20 overflow-hidden"
        >
          {/* Header */}
          <motion.div
            variants={item}
            className="px-4 sm:px-8 flex justify-between pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-white/15"
          >
           <div>
             <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Description of the Image
            </h1>
            <p className="mt-1 text-white/80 text-xs sm:text-sm">
              Rendered from backend text with smart heading detection
            </p>
           </div>
            <p>Responce Matching Score {score}</p>
          </motion.div>

          {/* Scrollable content */}
          <motion.div
            variants={item}
            className="max-h-[70vh] overflow-y-auto px-4 sm:px-8 py-4 sm:py-6"
          >
            <article className="prose prose-invert prose-headings:font-extrabold prose-h1:text-3xl sm:prose-h1:text-4xl prose-h2:text-xl sm:prose-h2:text-2xl prose-h3:text-lg sm:prose-h3:text-xl prose-p:leading-relaxed prose-li:leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: MotionH1,
                  h2: MotionH2,
                  h3: MotionH3,
                  p: MotionP,
                  li: MotionLi,
                  hr: MotionHr,
                  strong: (props: React.HTMLAttributes<HTMLSpanElement>) => (
                    <span
                      className="font-extrabold underline decoration-white/30 underline-offset-4"
                      {...props}
                    />
                  ),
                  a: (props: React.HTMLAttributes<HTMLAnchorElement>) => (
                    <a
                      className="underline decoration-white/40 hover:decoration-white"
                      {...props}
                    />
                  ),
                }}
              >
                {normalized}
              </ReactMarkdown>
            </article>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={item}
            className="px-4 sm:px-8 pb-4 sm:pb-6 pt-3 sm:pt-4 border-t border-white/15 text-[10px] sm:text-xs text-white/80 flex flex-wrap items-center gap-2"
          >
            <p>
              Type: This data is an image description generated from the uploaded
              image.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
