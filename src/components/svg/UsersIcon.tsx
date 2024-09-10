import {SVGProps, memo} from "react";

const UsersIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={14}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            stroke="#FFFFFFB3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 20c0-1.742-1.67-3.223-4-3.773M15 20c0-2.21-2.686-4-6-4s-6 1.79-6 4m12-7a4 4 0 0 0 0-8m-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
        />
    </svg>
);
const MemoUsersIcon = memo(UsersIcon);
export default MemoUsersIcon;
