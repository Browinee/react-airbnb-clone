import Header from "../components/Header";
import {useRouter} from "next/router";
import {format} from "date-fns";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import AppHead from "../components/atom/AppHead";

const formattedDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "dd MMM yy");
}

function Search(props) {
    const {searchResults} = props;
    const router = useRouter();
    const {location, startDate, endDate, numberOfGuests} = router.query;
    const range = `${formattedDate(startDate)} - ${formattedDate(endDate)}`;


    return (
        <div>
            <AppHead/>
            <Header placeHolder={`${location} | ${range} | ${numberOfGuests}`}/>
            <main
                className={"lg:grid-cols-[700px,1fr] xl:grid-cols-[840px,1fr] flex-grow grid grid-cols-1  duration-500"}
            >
                <section className={"px-4 py-8 duration-500 lg:py-12 lg:px-7"}>
                    <p className={"text-xs"}> 300+ Stays - {range} - for {numberOfGuests} guests</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6"> Stays in {location}</h1>
                    <div className={"hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap"}>
                        <p className={"button"}> Cancellation Flexibility</p>
                        <p className={"button"}>Type of Place</p>
                        <p className={"button"}>Price</p>
                        <p className={"button"}>Rooms and Beds</p>
                        <p className={"button"}>More filters</p>
                    </div>
                    <div className={"flex flex-col"}>
                        {
                            searchResults.map((item) => {
                                const {img, location, title, description, star, price, total, long, lat} = item;
                                return <InfoCard key={img} img={img} location={location} title={title}
                                                 description={description} star={star} price={price} total={total}
                                                 lat={lat} long={long}/>
                            })
                        }
                    </div>
                </section>
                <section
                    className={` sm:block sm:sticky top-[86px] h-map flex-grow bg-yellow-900 bg-opacity-10 duration-100`}
                >
                    <Map searchResults={searchResults}/>
                </section>
            </main>
            <Footer/>
        </div>
    );
}

export default Search;

export async function getServerSideProps() {
    let result;
    const searchResults = await fetch("https://links.papareact.com/isz");
    result = !searchResults.ok
        ? []
        : await searchResults.json();
    return {
        props: {
            searchResults: result,
        }
    }
}
