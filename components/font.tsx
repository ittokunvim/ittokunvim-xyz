import { Montserrat } from "@next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Font() {
  return (
    <style jsx global>
      {`
        html {
          font-family: ${montserrat.style.fontFamily};
          font-size: 14px;
          word-spacing: 2px;
          letter-spacing: 1px;
        }
      `}
    </style>
  );
}
