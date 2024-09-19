import {SVGProps, memo} from "react";

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} viewBox="0 0 24 24"  {...props}>
        <path d="m19.65 14.24-7-6a1 1 0 0 0-1.3 0l-7 6a1 1 0 0 0 1.3 1.52L12 10.316l6.35 5.442a1 1 0 0 0 1.3-1.518z"/>
    </svg>
);
const MemoArrowIcon = memo(ArrowIcon);
export default MemoArrowIcon;
