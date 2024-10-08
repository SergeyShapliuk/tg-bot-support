import {SVGProps, memo} from "react";

const StackIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={156}
        height={153}
        fill="none"
        {...props}
    >
        <path
            fill="url(#a)"
            fillOpacity={0.31}
            d="m67.309 108.194 39.585-13.023 5.077 10.9-36.633 14.316-8.03-12.193Z"
            opacity={0.78}
            style={{
                mixBlendMode: "multiply"
            }}
        />
        <path
            fill="#2774C1"
            d="m82.827 107.72 44.667-8.788.198 54.068H82.827v-45.28Z"
        />
        <path fill="#1D568E" d="m82.827 107.264-43.714-8.332V153h43.714v-45.736Z"/>
        <path
            fill="#2F8BE6"
            d="m39.55 98.893 44.253-30.21 43.143 30.21-43.777 30.369-43.62-30.37Z"
        />
        <path
            fill="#1D568E"
            d="m40.129 98.99 44.253-30.211 38.61 27.3-43.988 30.289L40.13 98.989Z"
        />
        <path
            fill="#1D568E"
            d="m83.827 60.097 38.778 26.817.387 9.164-38.69-26.926-.475-9.055Z"
        />
        <path
            fill="#002B65"
            d="M78.81 117.493 39.55 90.097v8.779l39.454 27.492-.193-8.875Z"
        />
        <path
            fill="#0057A1"
            d="M122.582 86.931 78.805 117.3l.2 9.068 43.987-30.29-.41-9.147Z"
        />
        <path
            fill="#2F8BE6"
            d="m39.55 90.097 44.253-30.096 38.802 26.913-43.801 30.579L39.55 90.097Z"
        />
        <path
            fill="#002365"
            d="M70.677 103.217 39.55 81.512v8.585l31.602 22.175-.475-9.055Z"
        />
        <path
            fill="#0145A0"
            d="m114.453 72.847-43.777 30.37.474 9.055 43.778-30.37-.475-9.055Z"
        />
        <path
            fill="#0061BF"
            d="M39.55 81.512 83.78 51.32l30.675 21.528-43.778 30.369L39.55 81.512Z"
        />
        <path
            fill="#001264"
            d="m79.87 87.879-30.289-21.03v8.586l30.58 21.222-.29-8.778Z"
        />
        <path
            fill="#012AA0"
            d="M114.406 64.148 79.679 87.781l.474 9.055 34.253-24.006V64.15Z"
        />
        <path
            fill="#0131C1"
            d="M49.678 66.945 84.5 43.409l29.904 20.74-34.727 23.537-30-20.741Z"
        />
        <path
            fill="#000263"
            d="M30.29 44.47 0 23.44v8.586l30.58 21.222-.29-8.778Z"
        />
        <path
            fill="#0106A0"
            d="M64.825 20.74 30.098 44.372l.474 9.055 34.253-24.005V20.74Z"
        />
        <path
            fill="#0010BE"
            d="M.097 23.536 34.92 0l29.904 20.74-34.727 23.537-30-20.741Z"
        />
        <defs>
            <linearGradient
                id="a"
                x1={68.233}
                x2={110.106}
                y1={114.175}
                y2={100.399}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#FEFEFE"/>
                <stop offset={1} stopColor="#2A2929"/>
            </linearGradient>
        </defs>
    </svg>
);
const MemoStackIcon = memo(StackIcon);
export default MemoStackIcon;
