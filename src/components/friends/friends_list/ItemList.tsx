// import React, {memo} from "react";
// import classes from "../Friends.module.css";
// import MemoUsersIcon from "../../svg/UsersIcon";
// import {GetUserReferrals, UserReferrals} from "../../../types/types";
//
// type PropsType = {
//     data: UserReferrals;
//     index: number;
// }
//
// function ItemList({data, index}: PropsType) {
//     console.log('ItemList',data[index]?.name)
//     return (
//         <div className={classes.itemFriends}>
//             <div style={{display: "flex", alignItems: "center", gap: 10}}>
//                 <div style={{
//                     width: 30,
//                     height: 30,
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     borderRadius: "50%",
//                     fontWeight: 500,
//                     backgroundColor: "rgb(49,125,148)"
//                 }}>{data[index]?.name?.slice(0, 1)}</div>
//                 <div>
//                     <div>{data[index]?.name}</div>
//                     <div style={{
//                         color: "#FFFFFFB3",
//                         fontSize: 12,
//                         display: "flex",
//                         flexDirection: "row",
//                         justifyContent: "start",
//                         alignItems: "center"
//                     }}>
//                         <MemoUsersIcon/>
//                         {data[index]?.referal_count === "0" ? "0" : `+ ${data[index]?.referal_count}`}
//                     </div>
//                 </div>
//             </div>
//             <div>{`+${data[index]?.amount} SD`}</div>
//         </div>
//     );
// }
//
// export default memo(ItemList);
