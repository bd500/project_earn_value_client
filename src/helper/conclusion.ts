const giveConclustion = (portfolio: any) => {
    const budget =
        portfolio.cv > 0 ? "overrun" : portfolio === 0 ? "on" : "underrun";
    const time = portfolio.sv > 0 ? "over" : portfolio === 0 ? "on" : "under";

    return `The project is ${budget} budget and ${time} schedule`;
};

export {giveConclustion};
