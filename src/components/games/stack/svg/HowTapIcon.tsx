import {SVGProps, memo} from "react";

const HowTapIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={296}
        height={179}
        fill="none"
        {...props}
    >
        <path
            fill="#fff"
            d="M283 163.5h-26c-3.5 0-5.5-3-7.5-5.5s-18-30.5-20-34.5-1-7 .5-8 4.5-.5 6.5 1 7.5 11.5 12 11.5c3.6 0 5.167-2 5.5-3 .333-9.333 1-28.8 1-32 0-4 1-18.5 1-20.5s1-5 5-5c3.2 0 4.333 3.333 4.5 5L268 108c5.167 2.5 16.4 8.1 22 10.5 5.6 2.4 5.667 7.667 5 10-.667 5.667-2.3 18.9-3.5 26.5-1.2 7.6-6.167 8.833-8.5 8.5Z"
        />
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeWidth={2}
            d="M261 50v7M242.378 60.682l6.304 3.94M242.389 81.64l7.251-4.028M272.378 77.682l6.304 3.94M279.682 60.378l-6.304 3.94"
        />
        <path
            fill="#000"
            d="m1 125.5 73.5 53v-12L1 113.5v12ZM74.5 178.5l73-53v-12l-73 53v12Z"
        />
        <path fill="#000" d="M74.5 62 1 113.5l73.5 53 73-53-73-51.5Z"/>
        <path
            stroke="#fff"
            strokeLinejoin="round"
            d="M74.5 178.5 1 125.5v-12m73.5 65 73-53v-12m-73 65v-12M1 113.5 74.5 62l73 51.5M1 113.5l73.5 53m0 0 73-53"
        />
        <path
            fill="#000"
            d="m1 113.5 73.5 53v-12L1 101.5v12ZM74.5 166.5l73-53v-12l-73 53v12Z"
        />
        <path fill="#000" d="M74.5 50 1 101.5l73.5 53 73-53-73-51.5Z"/>
        <path
            stroke="#fff"
            strokeLinejoin="round"
            d="M74.5 166.5 1 113.5v-12m73.5 65 73-53v-12m-73 65v-12M1 101.5 74.5 50l73 51.5M1 101.5l73.5 53m0 0 73-53"
        />
        <path
            fill="#000"
            d="m1 101.5 73.5 53v-12L1 89.5v12ZM74.5 154.5l73-53v-12l-73 53v12Z"
        />
        <path fill="#000" d="M74.5 38 1 89.5l73.5 53 73-53-73-51.5Z"/>
        <path
            stroke="#fff"
            strokeLinejoin="round"
            d="M74.5 154.5 1 101.5v-12m73.5 65 73-53v-12m-73 65v-12M1 89.5 74.5 38l73 51.5M1 89.5l73.5 53m0 0 73-53"
        />
        <path
            fill="#000"
            d="m35 64.5 73.5 53v-12L35 52.5v12ZM108.5 117.5l73-53v-12l-73 53v12Z"
        />
        <path fill="#000" d="M108.5 1 35 52.5l73.5 53 73-53-73-51.5Z"/>
        <path
            stroke="#fff"
            strokeLinejoin="round"
            d="M108.5 117.5 35 64.5v-12m73.5 65 73-53v-12m-73 65v-12M35 52.5 108.5 1l73 51.5M35 52.5l73.5 53m0 0 73-53"
        />
    </svg>
);
const MemoHowTapIcon = memo(HowTapIcon);
export default MemoHowTapIcon;
