import {SVGProps, memo} from "react";

const HomeIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={23}
        fill="none"
        {...props}
    >
        <path
            fill="currentFill"
            d="M12.12.463a1.676 1.676 0 0 0-2.312 0l-8.15 7.753a2.547 2.547 0 0 0-.79 1.846v9.43c0 1.402 1.13 2.539 2.524 2.539h2.524a2.532 2.532 0 0 0 2.524-2.54v-4.233c0-.467.377-.846.842-.846h3.366c.464 0 .841.379.841.846v4.233c0 1.403 1.13 2.54 2.524 2.54h2.525a2.532 2.532 0 0 0 2.524-2.54v-9.43c0-.698-.286-1.365-.79-1.845L12.12.463Z"
        />
    </svg>
);
const MemoHomeIcon = memo(HomeIcon);
export default MemoHomeIcon;
