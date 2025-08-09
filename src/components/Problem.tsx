"use client";

import React from "react";
import { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";

export default function Problem() {
  return (
    <section className="py-20 lg:py-40 bg-neutral-50 dark:bg-neutral-950" aria-labelledby="problem-title">
      <div className="px-8 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          id="problem-title"
          className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white"
        >
          Buying Ads on Telegram Shouldn’t Be This Hard
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300"
        >
          These common pain points make Telegram advertising frustrating and ineffective for most businesses.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 md:gap-6 max-w-6xl mx-auto px-6">
        {problems.map((problem, index) => (
          <motion.div
            key={problem.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative p-6 rounded-3xl overflow-hidden group hover:shadow-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-800"
          >
            <Grid size={20} />
            <div className="relative z-20">
              <div className="text-4xl mb-4 opacity-60">{problem.icon}</div>
              <p className="text-base font-bold text-neutral-800 dark:text-white mb-3">
                {problem.title}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-base font-normal">
                {problem.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const problems = [
  {
    title: "Finding the Right Channels",
    description: "You struggle to locate the right channel for your brand, wasting hours searching through countless options without clear categorization.",
    icon: "🔍",
  },
  {
    title: "Unresponsive Admins",
    description: "You're tired of begging admins for responses, dealing with slow communication and unprofessional service that delays your campaigns.",
    icon: "😤",
  },
  {
    title: "Overpriced Ad Placements",
    description: "You get overcharged by admins for ads placement, with no transparent pricing structure or guarantee of fair market rates.",
    icon: "💸",
  },
  {
    title: "Poor Campaign Results",
    description: "Your ads keep yielding poor results due to lack of targeting options, fake engagement, and no proper analytics or tracking.",
    icon: "📉",
  },
];

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: Array<[number, number]>;
  size?: number;
}) => {
  const [generatedSquares, setGeneratedSquares] = useState<Array<[number, number]>>(
    () => pattern ?? []
  );

  useEffect(() => {
    if (pattern) return;
    const randomSquare = (): [number, number] => [
      Math.floor(Math.random() * 4) + 7,
      Math.floor(Math.random() * 6) + 1,
    ];
    setGeneratedSquares([
      randomSquare(),
      randomSquare(),
      randomSquare(),
      randomSquare(),
      randomSquare(),
    ]);
  }, [pattern]);
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full">
      <div className="absolute inset-0 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={generatedSquares}
          className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

type GridPatternProps = React.SVGProps<SVGSVGElement> & {
  width: number;
  height: number;
  x: number | string;
  y: number | string;
  squares?: Array<[number, number]>;
};

export function GridPattern({ width, height, x, y, squares, ...props }: GridPatternProps) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([squareX, squareY]: [number, number], index: number) => (
            <rect
              strokeWidth="0"
              key={`${squareX}-${squareY}-${index}`}
              width={width + 1}
              height={height + 1}
              x={squareX * width}
              y={squareY * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

