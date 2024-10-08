import {SVGProps, memo} from "react";

const HowGameIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={299}
        height={218}
        fill="none"
        {...props}
    >
        <path
            fill="#fff"
            d="M286.62 201.5h-26c-3.5 0-5.5-3-7.5-5.5s-18-30.5-20-34.5-1-7 .5-8 4.5-.5 6.5 1 7.5 11.5 12 11.5c3.6 0 5.167-2 5.5-3 .333-9.333 1-28.8 1-32 0-4 1-18.5 1-20.5s1-5 5-5c3.2 0 4.333 3.333 4.5 5l2.5 35.5c5.167 2.5 16.4 8.1 22 10.5 5.6 2.4 5.667 7.667 5 10-.667 5.667-2.3 18.9-3.5 26.5-1.2 7.6-6.167 8.833-8.5 8.5Z"
        />
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeWidth={2}
            d="M264.62 88v7M245.998 98.682l6.304 3.94M246.009 119.64l7.251-4.029M275.998 115.682l6.304 3.94M283.302 98.378l-6.304 3.94"
        />
        <path
            fill="#000"
            d="m1 164.5 73.5 53v-12L1 152.5v12ZM74.5 217.5l73-53v-12l-73 53v12Z"
        />
        <path fill="#000" d="M74.5 101 1 152.5l73.5 53 73-53-73-51.5Z"/>
        <path
            stroke="#fff"
            strokeLinejoin="round"
            d="M74.5 217.5 1 164.5v-12m73.5 65 73-53v-12m-73 65v-12M1 152.5 74.5 101l73 51.5M1 152.5l73.5 53m0 0 73-53"
        />
        <path
            fill="#000"
            d="m1 152.5 73.5 53v-12L1 140.5v12ZM74.5 205.5l73-53v-12l-73 53v12Z"
        />
        <path fill="#000" d="M74.5 89 1 140.5l73.5 53 73-53-73-51.5Z"/>
        <path
            stroke="#fff"
            strokeLinejoin="round"
            d="M74.5 205.5 1 152.5v-12m73.5 65 73-53v-12m-73 65v-12M1 140.5 74.5 89l73 51.5M1 140.5l73.5 53m0 0 73-53"
        />
        <path
            fill="#000"
            d="m1 140.5 73.5 53v-12L1 128.5v12ZM74.5 193.5l73-53v-12l-73 53v12Z"
        />
        <path fill="#000" d="M74.5 77 1 128.5l73.5 53 73-53-73-51.5Z"/>
        <path
            stroke="#fff"
            strokeLinejoin="round"
            d="M74.5 193.5 1 140.5v-12m73.5 65 73-53v-12m-73 65v-12M1 128.5 74.5 77l73 51.5M1 128.5l73.5 53m0 0 73-53"
        />
        <path
            fill="#000"
            d="m90 64.5 73.5 53v-12L90 52.5v12ZM163.5 117.5l73-53v-12l-73 53v12Z"
        />
        <path fill="#000" d="M163.5 1 90 52.5l73.5 53 73-53-73-51.5Z"/>
        <path
            stroke="#fff"
            strokeLinejoin="round"
            d="M163.5 117.5 90 64.5v-12m73.5 65 73-53v-12m-73 65v-12M90 52.5 163.5 1l73 51.5M90 52.5l73.5 53m0 0 73-53"
        />
    </svg>
);
const MemoHowGameIcon = memo(HowGameIcon);
export default MemoHowGameIcon;
