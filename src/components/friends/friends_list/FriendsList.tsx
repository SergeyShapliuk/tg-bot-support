import {useCallback, useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {useFetchReferrals} from "../../../hooks/useFetchReferrals";
import {initInitData} from "@telegram-apps/sdk-react";
import {UserReferrals} from "../../../types/types";
import classes from "../Friends.module.css";
import MemoArrowIcon from "../../svg/ArrowIcon";
import MemoFriendsIcon from "../../svg/FriendsIcon";

const limit = 50;

function FriendsList() {
    const initData = initInitData();

    const [items, setItems] = useState<UserReferrals[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(0);
    const [showScrollTopButton, setShowScrollTopButton] = useState<boolean>(false);

    const {data: referrals} = useFetchReferrals(initData?.user?.id.toString() ?? "899065167", limit, offset);
    // console.log("FriendsList", referrals);
    // console.log("Friendsitems", items);
    useEffect(() => {
        if (referrals) {
            setItems((prevItems) => {
                const newItems = referrals.data.filter(
                    referral => !prevItems.some(item => item.customer === referral.customer)
                );
                return [...prevItems, ...newItems];
            });
            setHasMore(referrals.data.length === limit);
        }
    }, [referrals]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.getElementById("catalog-scroll-container")?.scrollTop || 0;
            setShowScrollTopButton(scrollTop > 300); // Показать кнопку, если прокручено более чем на 300px
        };

        const scrollContainer = document.getElementById("catalog-scroll-container");
        scrollContainer?.addEventListener("scroll", handleScroll);

        return () => {
            scrollContainer?.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = useCallback(() => {
        const scrollContainer = document.getElementById("catalog-scroll-container");
        if (scrollContainer) {
            scrollContainer.scrollTo({top: 0, behavior: "smooth"});
        }
    }, []);

    const loadMoreData = useCallback(() => {
        if (hasMore) {
            setOffset((prevOffset) => prevOffset + limit); // Обновляем offset для следующего запроса
        }
    }, [hasMore]);
    return (
        <div className={classes.listFriends_container}>
            <div style={{
                position: "relative", fontSize: "15px",
                fontWeight: 700, textAlign: "left", zIndex: 10
            }}>{`${referrals?.info?.cols_ref} friends:`}
                <div id="catalog-scroll-container" className={classes.listFriends}>
                    <InfiniteScroll
                        scrollableTarget={"catalog-scroll-container"}
                        dataLength={items.length}
                        next={loadMoreData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        // endMessage={<p>No more data</p>}

                    >
                        {items?.map(friend => (
                            <div className={classes.itemFriends} key={friend.customer}>
                                <div style={{display: "flex", alignItems: "center", gap: 15}}>
                                    <div style={{
                                        width: 30,
                                        height: 30,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "50%",
                                        color: "#3193F4",
                                        background: "radial-gradient(57.6% 283.1% at 50% 50%, #FFFFFF 0%, #3193F4 100%)",
                                        boxShadow: "0px 1px 3px 0px #00000014"

                                    }}>{friend?.name?.slice(0, 1)}</div>
                                    <div>
                                        <div>{friend.name}</div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "start",
                                            alignItems: "center",
                                            color: "#FFFFFFB3",
                                            fontSize: "10px",
                                            lineHeight: "11px"
                                        }}>
                                            <MemoFriendsIcon width={12} height={8} fill={"#FFFFFF"}
                                                             style={{paddingRight: 3}}/>
                                            {friend.referal_count === "0" ? "0" : `+${friend.referal_count}`}
                                        </div>
                                    </div>
                                </div>
                                <div>{Number(friend.amount) === 0 ? "0 SD" : `+${friend.amount} SD`}</div>
                            </div>
                        ))}
                    </InfiniteScroll>
                    {showScrollTopButton && (<div
                        onClick={scrollToTop}
                        // className={classes.scrollToTopButton}
                        style={{
                            position: "fixed",
                            width: 35,
                            aspectRatio: 1,
                            bottom: 180,
                            right: 20,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#FFFFFF",
                            color: "#000000",
                            borderRadius: "50px",
                            zIndex: 999
                        }}
                    >
                        <MemoArrowIcon style={{marginBottom: 1}}/>
                    </div>)}
                </div>
            </div>
        </div>
    );
}

export default FriendsList;
