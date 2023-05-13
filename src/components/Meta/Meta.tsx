import {Helmet} from "react-helmet";
import {ReactChild} from "react";

interface MetaProps {
    children: ReactChild;
}

const Meta = ({children}: MetaProps) => {
    return (
        <>
            <Helmet>
                <title>{children}</title>
            </Helmet>
        </>
    );
};
export default Meta;
