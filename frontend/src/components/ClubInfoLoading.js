import React from "react";

function ClubInfoLoading(Component) {
    return function ClubInfoLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
        return (
            <p style={{ fontSize: '25px' }}>
                We are waiting for the data to load!...
                </p>
        );
    };
}
export default ClubInfoLoading;