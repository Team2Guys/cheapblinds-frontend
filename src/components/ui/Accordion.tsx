import { MdKeyboardArrowDown } from "react-icons/md";

const Accordion = ({
    title,
    children,
    sectionKey,
    openSections,
    toggleSection,
    refObj,
    // eslint-disable-next-line
}: any) => {

    return (
        <div>
            {/* header */}
            <div
                className="flex items-center justify-between border-b border-[#0000003D] px-2 pb-1 cursor-pointer"
                onClick={() => toggleSection(sectionKey)}
            >
                <p className="font-semibold">{title}</p>
                <MdKeyboardArrowDown
                    className={`transition-transform duration-300 ${openSections[sectionKey] ? "rotate-180" : ""}`}
                />
            </div>

            {/* animated wrapper */}
            <div
                ref={refObj}
                className="overflow-hidden transition-all duration-300"
                style={{
                    height: openSections[sectionKey]
                        ? refObj.current?.scrollHeight
                        : 0,
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Accordion;