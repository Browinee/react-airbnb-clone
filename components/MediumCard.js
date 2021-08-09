import Image from "next/image";

function MediumCard(props) {
    const {img, title} = props;
    return (
        <div className={"cursor-pointer hover:scale-105  transition transform duration-300 ease-out p-3 -ml-3"}>
            <div className={"relative h-80 w-80"}>
                <Image
                    src={img}
                    layout={"fill"}
                    className={"rounded-xl"}
                />
            </div>
            <h3 className={"text-2xl mt-3"}>{title}</h3>
        </div>
    );
}

export default MediumCard;
