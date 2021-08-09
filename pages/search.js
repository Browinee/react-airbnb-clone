import Header from "../components/Header";
import Head from "next/head";
import {useRouter} from "next/router";
import {format} from "date-fns";
import Footer from "../components/Footer";

const formattedDate = (date) =>{
    if(!date) return "";
    return format(new Date(date), "dd MMM yy");
}

function Search(){
    const router = useRouter();
    const {location, startDate, endDate, numberOfGuests} = router.query;
    const range = `${formattedDate(startDate)} - ${formattedDate(endDate)}`;
    return (
        <div>
            <Head>
                <title>Search</title>
            </Head>
            <Header placeHolder={`${location} | ${range} | ${numberOfGuests}`} />
            <main className={"flex"}>
                <section className={"flex-grow pt-14 px-6"}>
                    <p className={"text-xs"}> 300+ Stays - {range} - for {numberOfGuests} guests</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6"> Stays in {location}</h1>
                    <div className={"hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap"}>
                        <p className={"button"}> Cancellation Flexibility</p>
                        <p className={"button"}>Type of Place</p>
                        <p className={"button"}>Price</p>
                        <p className={"button"}>Rooms and Beds</p>
                        <p className={"button"}>More filters</p>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
}

export default Search;
