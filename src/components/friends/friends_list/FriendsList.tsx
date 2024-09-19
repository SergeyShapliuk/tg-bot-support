import {useCallback, useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {useFetchReferrals} from "../../../hooks/useFetchReferrals";
import {initInitData} from "@telegram-apps/sdk-react";
import {UserReferrals} from "../../../types/types";
import classes from "../Friends.module.css";
import MemoUsersIcon from "../../svg/UsersIcon";
import MemoArrowIcon from "../../svg/ArrowIcon";

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
        <div style={{
            marginTop: "20px",
            textAlign: "start"
        }}>{`${Number(referrals?.info?.cols_ref).toLocaleString()} friends`}
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
                            <div style={{display: "flex", alignItems: "center", gap: 10}}>
                                <div style={{
                                    width: 30,
                                    height: 30,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                    fontWeight: 500,
                                    backgroundColor: "rgb(49,125,148)"
                                }}>{friend?.name?.slice(0, 1)}</div>
                                <div>
                                    <div>{friend.name}</div>
                                    <div style={{
                                        color: "#FFFFFFB3",
                                        fontSize: 12,
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "start",
                                        alignItems: "center"
                                    }}>
                                        <MemoUsersIcon/>
                                        {friend.referal_count === "0" ? "0" : `+ ${friend.referal_count}`} Даниил
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
    );
}

export default FriendsList;
