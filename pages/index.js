import Head from 'next/head'
import Header from "../components/Header";
import Banner from "../components/Banner";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import LargeCard from "../components/LargeCard";
import Footer from "../components/Footer";

export default function Home(props) {
    const {exploreData, cardsData} = props;
    return (
        <div className="">
            <Head>
                <title>Airbnb</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <Banner/>
            <main className={"max-w-7xl mx-auto px-8 sm:px-16"}>
                <section className={"pt-6"}>
                    <h2 className={"text-4xl font-semibold pb-5"}>Explore Nearby</h2>
                    <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}>
                        {
                            exploreData?.map((item) => {
                                return <SmallCard key={item.img} img={item.img} distance={item.distance}
                                                  location={item.location}/>
                            })
                        }
                    </div>
                </section>
                <section className={"text-4xl font-semibold py-8"}>
                    <h2>Live Anywhere</h2>
                    <div className={"flex space-x-3 overflow-scroll scrollbar-hide"}>

                        {
                            cardsData?.map(item => (
                                <MediumCard key={item.img} img={item.img} title={item.title}/>
                            ))
                        }
                    </div>
                </section>
                <LargeCard img={"https://links.papareact.com/4cj"}
                           title={"The Greatest Outdoors"}
                           description={"Wishlists curated by Airbnb."}
                           buttonText={"Get Inspired"}
                />
            </main>
            <Footer />
        </div>
    )
}

const NEAR_BY_DATA_URL = "https://links.papareact.com/pyp";
const LIVE_ANYWHERE_DATA_URL = "https://links.papareact.com/zp1";

export async function getStaticProps() {
    const promises = [NEAR_BY_DATA_URL, LIVE_ANYWHERE_DATA_URL].map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            return []
        }
        return response.json();
    })
    const [exploreData, cardsData] = await Promise.all(promises);
    return {
        props: {
            exploreData,
            cardsData,
        }
    }

}
