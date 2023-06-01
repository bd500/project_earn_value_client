import {RowData} from "../components/DynamicTable/DynamicTable";

const calCumCost = (data: number[]) => {
    let result: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    data.forEach((value, index) => {
        index !== 0
            ? (result[index] += value + result[index - 1])
            : (result[index] = value);
    });
    return result;
};

const calCost = (data: RowData[]) => {
    let result: {
        ac: number[];
        pv: number[];
        ev: number[];
        currentMonth: number;
    } = {
        ac: [],
        pv: [],
        ev: [],
        currentMonth: 1,
    };

    let ac = 0;
    let ev = 0;
    let pv = 0;

    let pvTasks: number[] = [];
    data.forEach((item) => {
        const temp = item.pv.reduce((acc, cur) => acc + cur);
        pvTasks.push(temp);
    });

    for (let i = 0; i < data[0].ac.length; i++) {
        ev = 0;
        data.forEach((item, index) => {
            pv += item.pv[i];
            ac += item.ac[i];
            // ev += parseFloat(((item.pv[i] * item.progress[i]) / 100).toFixed(2));
            if (item.progress[i] > 0)
                ev += parseFloat(
                    ((pvTasks[index] * item.progress[i]) / 100).toFixed(2)
                );
        });

        if (ev === 0) {
            ev = result.ev[result.ac.length - 1];
        }

        if (result.ac[result.ac.length - 1] !== ac) {
            result.ac.push(ac);

            result.ev.push(ev);
        }
        result.pv.push(pv);
    }

    result.currentMonth = result.ev.length;
    return result;
};

const calPortfolio = (data: RowData[], ev: number) => {
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

    // const cumCost = calCost(data);

    // result.ev = cumCost.ev[cumCost.currentMonth - 1];
    // result.bac = cumCost.pv[cumCost.pv.length - 1];
    // result.ac = cumCost.ac[cumCost.currentMonth - 1];

    result.ev = ev;

    data.forEach((item) => {
        result.bac += item.pv.reduce((acc, cur) => acc + cur);
        result.ac += item.ac.reduce((acc, cur) => acc + cur);
        // result.ev += item.ev.reduce((acc, cur) => acc + cur);
        // result.ev = item.progress.reduce((acc, cur) => acc + cur);
        result.pv += item.pv.reduce((acc, cur) => acc + cur);
    });

    result.cpi = parseFloat((result.ev / result.ac).toFixed(2));
    result.cv = result.ev - result.ac;
    // result.etc = parseFloat(((result.bac - result.ev) / result.cpi).toFixed(2));
    result.etc = (result.bac - result.ev) / result.cpi;
    result.eac = result.etc + result.ac;
    result.vac = result.bac - result.eac;
    result.sv = result.ev - result.pv;
    result.spi = result.ev / result.pv;

    // console.log(data);

    return result;
};

export {calCumCost, calPortfolio, calCost};
