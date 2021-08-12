import Head from 'next/head';


const defaultProps = {
    title: 'Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences',
    description:
        'Find vacation rentals, cabins, beach houses, unique homes and experiences around the world - all made possible by hosts on Airbnb.',
};

const AppHead = ({ title = defaultProps.title, description = defaultProps.description } ) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
        </Head>
    );
};


export default AppHead;
