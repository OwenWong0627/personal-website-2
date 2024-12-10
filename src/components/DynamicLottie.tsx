import dynamic from "next/dynamic";

const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });

export default DynamicLottie;
