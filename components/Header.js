import {useState} from "react";
import Image from "next/image";
import {GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon, UserIcon} from "@heroicons/react/solid";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRangePicker} from 'react-date-range';
import {useRouter} from "next/router";

function Header(props) {
    const {placeHolder} = props;
    const router = useRouter();
    const goHome = () => {
        router.push("/");
    }
    const [search, setSearch] = useState("");
    const searchHandler = (e) => {
        const value = e.target.value;
        setSearch(value);
    }
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });
    const handleSelect = (ranges) => {
        setSelectionRange(ranges.selection);
    }

    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const numberOfGuestsHandler = e => {
        const value = +e.target.value;
        if (+value < 1 || isNaN(+value)) {
            setNumberOfGuests(1);
            return
        }
        setNumberOfGuests(value);
    }

    const resetHandler = () => {
        setSearch("");
    };
    const submitHandler = () => {
        router.push({
            pathname: '/search',
            query: {
                location: search,
                startDate: selectionRange.startDate.toISOString(),
                endDate: selectionRange.endDate.toISOString(),
                numberOfGuests,
            }
        });
    }
    return (
        <header className="sticky top-0 z-50  bg-white grid grid-cols-3 shadow-md p-5 md:px-10">
            <div onClick={goHome} className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image
                    src="https://links.papareact.com/qd3"
                    layout={"fill"}
                    objectFit={"contain"}
                    objectPosition={"left"}
                />
            </div>
            <div className={"flex items-center md:border-2 rounded-full py-2 md:shadow-sm"}>
                <input
                    placeholder={placeHolder || "Stay your search"}
                    value={search}
                    onChange={searchHandler}
                    type="text"
                    className={"flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"}/>
                <SearchIcon
                    className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"/>
                <div className={"w-100 h-100"}></div>
            </div>
            <div ranges={[selectionRange]} className={"flex justify-end items-center space-x-4 text-gray-500"}>
                <p className={"hidden md:inline cursor-pointer"}>Become a host!</p>
                <GlobeAltIcon className={"h-6"}/>
                <div className={"flex items-center space-x-2 border-2 p-2 rounded-full"}>
                    <MenuIcon className={"h-6 cursor-pointer"}/>
                    <UserCircleIcon className={"h-6 cursor-pointer"}/>
                </div>
            </div>
            {
                search && (
                    <div className={"col-span-3 mx-auto flex flex-col mt-5"}>
                        <DateRangePicker ranges={[selectionRange]}
                                         minDate={new Date()} rangeColors={["#FD5B61"]} onChange={handleSelect}/>
                        <div className={"flex items-center border-b mb-4"}>
                            <h2 className={"text-2xl font-semibold flex-grow"}>Number of Guests</h2>
                            <UserIcon className={"h-5"}/>
                            <input min={1} type="number" value={numberOfGuests} onChange={numberOfGuestsHandler}
                                   className={"w-12 pl-2 text-lg outline-none text-red-400"}/>
                        </div>
                        <div className={"flex"}>
                            <button className={"flex-grow text-gray-500"} onClick={resetHandler}>Cancel</button>
                            <button className={"flex-grow text-red-400"} onClick={submitHandler}>Search</button>
                        </div>
                    </div>

                )
            }
        </header>
    );
}

export default Header;
