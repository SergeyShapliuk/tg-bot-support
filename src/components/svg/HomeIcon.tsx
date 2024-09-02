import {SVGProps, memo} from "react";

const HomeIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 25 24"
        {...props}
    >
        <path
            stroke={props.stroke ? props.stroke : "#FFF"}
            strokeWidth={1.5}
            d="M2.5 10.083a4 4 0 0 1 1.706-3.277l6-4.2a4 4 0 0 1 4.588 0l6 4.2a4 4 0 0 1 1.706 3.277V20a2 2 0 0 1-2 2h-16a2 2 0 0 1-2-2v-9.917Z"
        />
        <path
            stroke={props.stroke ? props.stroke : "#FFF"}
            strokeWidth={1.5}
            d="M18.5 22V12a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v10"
        />
        <path
            stroke={props.stroke ? props.stroke : "#FFF"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18.5 14h-12M18.5 18h-12"
        />
    </svg>
);
const MemoHomeIcon = memo(HomeIcon);
export default MemoHomeIcon;
