import Head from 'next/head'
import Header from "../components/Header";
import Banner from "../components/Banner";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";

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
                    {
                        cardsData?.map(item => (
                            <MediumCard key={item.img} img={item.img} title={item.title}/>
                        ))
                    }
                </section>
            </main>
        </div>
    )
}

const NEAR_BY_DATA_URL = "https://links.papareact.com/pyp";
const LIVE_ANYWHERE_DATA_URL = "https://links.papareact.com/zp1";

export async function getStaticProps() {
    const [exploreData, cardsData] = await Promise.all([NEAR_BY_DATA_URL, LIVE_ANYWHERE_DATA_URL].map(async (url) => {
        const response = await fetch(NEAR_BY_DATA_URL);
        if (!response.ok) {
            return []
        }
        return response.json();
    }));
    return {
        props: {
            exploreData,
            cardsData,
        }
    }

}
