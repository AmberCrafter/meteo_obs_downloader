import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../reduxStore";
import { format } from "react-string-format";
import { ProcessStepBlock, to_process_step } from '../reduxStore/processStepStore';

import "./process_step_bar.css"
import { setStage } from '../reduxStore/downloaderStore';

import { download_csv } from "../lib/apis/naho";


const ProcessStep: () => JSX.Element =
() => {
    const dispatch = useDispatch();
    const process_step = useSelector((state: RootState) => state.processStepReducer);
    const site = useSelector((state: RootState) => state.downloaderReducer.site);
    const starttime = useSelector((state: RootState) => state.downloaderReducer.starttime);
    const endtime = useSelector((state: RootState) => state.downloaderReducer.endtime);
    // const parameters = useSelector((state: RootState) => state.downloaderReducer.parameter);
    const parametersCode = useSelector((state: RootState) => state.downloaderReducer.parameterCode);


    const do_download = () => {
        let res = download_csv(
            [0, 1, ...parametersCode],
            starttime,
            endtime,
            2, 1, "", 0
        );

        const filename = format("{0}_{1}_{2}.data", site, starttime, endtime);

        res.then( val => val.blob())
        .then((blob) => {
            const href = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((err) => {
            return Promise.reject({ Error: 'Download failed', err });
        })
    }

    return (
        <div className='process-set-bar'>
            {
                process_step.list.map((val: ProcessStepBlock) => {
                    if (val.name == "Download") {
                        return <button key={"process_step_button-" + val.name} onClick={() => {
                            do_download();
                            dispatch(setStage(val.stage));
                        }}>{val.name}</button>
                    } else {
                        return <button key={"process_step_button-" + val.name} onClick={() => {
                            dispatch(to_process_step(val.stage));
                            dispatch(setStage(val.stage));
                        }}>{val.name}: {val.value}</button>
                    }
                })
            }
        </div>
    );
}

export default ProcessStep;