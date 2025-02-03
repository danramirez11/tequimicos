import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreType } from "../../store/store";
import { fetchReceiptsData } from "../../store/slices/receiptSlice";
import ReceiptHis from "../../components/History/ReceiptHis/ReceiptHis";

const HistoryPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { receipts, loading } = useSelector((state: StoreType) => state.receipts)

    useEffect(() => {
        dispatch(fetchReceiptsData())
    }, [])

    console.log(loading)

    return (
        <section className="page">
            <h1>Historial</h1>

            { loading && <p>Trayendo los datos...</p> }
            
            { receipts.map((r) => {
                return (
                    <ReceiptHis key={r.id} receipt={r}/>
                )
            })}
        </section>
    );
}

export default HistoryPage;