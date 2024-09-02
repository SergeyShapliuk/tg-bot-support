import {SVGProps, memo} from "react";

const TasksIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <path
            stroke={props.stroke ? props.stroke : "#FFF"}
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2 7a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V7Z"
        />
        <path
            stroke={props.stroke ? props.stroke : "#FFF"}
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2 7h20v4H2V7Z"
        />
        <path stroke={props.stroke ? props.stroke : "#FFF"} strokeLinecap="round" strokeWidth={1.5} d="M8 17H6"/>
    </svg>
);
const MemoTasksIcon = memo(TasksIcon);
export default MemoTasksIcon;
