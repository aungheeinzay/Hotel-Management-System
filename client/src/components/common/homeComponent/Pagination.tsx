import { useState } from "react";
import ReactPaginateModule from "react-paginate";
import { RiArrowLeftWideFill, RiArrowRightWideLine } from "@remixicon/react";
import { useSearchParams } from "react-router";
import updateSearchParams from "@/components/common/homeComponent/updateSearchParams.ts";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// @ts-ignore
const ReactPaginate = ReactPaginateModule.default || ReactPaginateModule;

export default function Pagination({ totalDoc }: { totalDoc: number }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [perPage, setPerPage] = useState(searchParams.get("perPage") || "5");



    const currentPage = Number(searchParams.get("page") || 1);

    function handlePageClick({ selected }: { selected: number }) {
        console.log("selected page index:", selected);
        const params = new URLSearchParams(searchParams);
        // selected က 0 ကစလို့ URL ထဲထည့်ရင် +1 ပေါင်းပေးရတယ်
        const newParams = updateSearchParams(params, "page", (selected + 1).toString());
        setSearchParams(newParams);
    }

    function handlePerPage(count: string) {
        setPerPage(count);
        const params = new URLSearchParams(searchParams);
        const newParams = updateSearchParams(params, "perPage", count);
        // perPage ပြောင်းရင် page ကို နံပါတ် ၁ ပြန်ပေးတာ ပိုကောင်းပါတယ်
        const finalParams = updateSearchParams(newParams, "page", "1");
        setSearchParams(finalParams);
    }

    const pageCount = Math.ceil(totalDoc / +perPage);

    return (
        <section className={"pagination"}>
            {pageCount > 0 && (
                <ReactPaginate
                    className={"mx-auto flex w-full justify-center items-center my-8 gap-2 list-none select-none"}
                    breakLabel="..."
                    nextLabel={<RiArrowRightWideLine />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    forcePage={currentPage - 1}
                    previousLabel={<RiArrowLeftWideFill />}
                    renderOnZeroPageCount={null}

                    // 💡 Wrapper (<li>) styling များကို အနည်းငယ်လျှော့ပြီး Link (<a>) များကို တိုက်ရိုက် style ပေးပါမည်
                    pageClassName={"block"}
                    pageLinkClassName={"border border-gray-500 px-4 py-2 rounded-md cursor-pointer block hover:bg-gray-100 transition-colors"}

                    // 💡 Active ဖြစ်နေတဲ့အချိန် Link style
                    activeLinkClassName={"bg-black text-white border-black cursor-default hover:bg-black"}

                    // 💡 Arrow ခလုတ်များအတွက် Link style
                    previousLinkClassName={"block p-2 border border-gray-500 rounded-md cursor-pointer hover:bg-gray-100"}
                    nextLinkClassName={"block p-2 border border-gray-500 rounded-md cursor-pointer hover:bg-gray-100"}

                    // 💡 နှိပ်လို့မရတဲ့ အခြေအနေ (ဥပမာ- ပထမဆုံးစာမျက်နှာမှာ prev ခလုတ်)
                    disabledLinkClassName={"text-gray-300 border-gray-300 cursor-not-allowed pointer-events-none"}
                />
            )}

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">change per page ({perPage})</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        {["5", "10", "15", "20", "25", "30", "35", "40"].map((itm) => (
                            <DropdownMenuItem key={itm} onClick={() => handlePerPage(itm)}>
                                {itm}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </section>
    );
}