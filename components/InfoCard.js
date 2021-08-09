import Image from "next/image";
import {HeartIcon} from "@heroicons/react/outline";
import {StarIcon} from "@heroicons/react/solid";

function InfoCard(props) {
    const {img, location, title, description, star, price, total, long, lat} = props;

    return (
        <div className={"flex py-7 px-2 cursor-pointer border-b  first:border-t hover:shadow-lg hover:opacity-80 transition duration-200 ease-out"}>
            <div className={"relative w-40 h-24 md:h-52 md:w-80 flex-shrink-0 "}>
                <Image src={img} layout={"fill"} objectFit={"cover"}/>
            </div>
            <div className={"flex flex-col flex-grow pl-5"}>
                <div className={"flex justify-between"}>
                    <p>{location}</p>
                    <HeartIcon className={"cursor-pointer h-7"}/>
                </div>
                <h4 className={"text-xl"}>{title}</h4>
                <div className={"border-b w-10 pt-2"}/>
                <p className={"pt-2 text-sm text-gray-500 flex-grow"}>{description}</p>
                <div className={"flex justify-between pt-5 items-end"}>
                    <p className={"flex items-center first:border-t"}>
                        <StarIcon className={"h-5 text-red-400"}/>
                        {star}
                    </p>
                    <div>
                        <p className={"text-lg lg:text-2xl font-semibold pb-2"}>{price}</p>
                        <p className={"text-right font-extra-light"}>{total}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoCard;
