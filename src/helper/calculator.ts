const calCumCost = (data: number[]) => {
    let result: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    data.forEach((value, index) => {
        index !== 0
            ? (result[index] += value + result[index - 1])
            : (result[index] = value);
    });
    return result;
};

const calPortfolio = (data: any[]) => {
    let result = {
        bac: 0,
        ac: 0,
        ev: 0,
        cv: 0,
        cpi: 0,
        vac: 0,
        eac: 0,
        etc: 0,
        sv: 0,
        tv: 0,
        spi: 0,
        pv: 0,
    };

    data.forEach((item) => {
        result.bac += item.pv;
        result.ac += item.ac;
        result.ev += item.ev;
        result.pv += result.ac === 0 ? 0 : item.pv;
    });

    result.cpi = parseFloat((result.ev / result.ac).toFixed(2));
    result.cv = result.ev - result.ac;
    result.etc = parseFloat(((result.bac - result.ev) / result.cpi).toFixed(2));
    result.eac = parseFloat((result.etc + result.ac).toFixed(2));
    result.vac = parseFloat((result.bac - result.eac).toFixed(2));
    result.sv = result.ev - result.pv;
    result.spi = parseFloat((result.ev / result.pv).toFixed(2));

    return result;
};

export {calCumCost, calPortfolio};
