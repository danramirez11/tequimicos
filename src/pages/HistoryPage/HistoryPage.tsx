 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreType } from "../../store/store";
import { fetchReceiptsData } from "../../store/slices/receiptSlice";
import ReceiptHis from "../../components/History/ReceiptHis/ReceiptHis";
import './HistoryPage.css'

const HistoryPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { receipts, loading } = useSelector((state: StoreType) => state.receipts)

    useEffect(() => {
        dispatch(fetchReceiptsData())
    }, [])

    return (
        <section className="page history-page">
            <h1>Historial</h1>

            { loading && <p>Trayendo los datos...</p> }

            <section className="history-receipts">
            
            { receipts.map((r) => {
                return (
                    <ReceiptHis key={r.id} receipt={r}/>
                )
            })}
            </section>
        </section>
    );
}

export default HistoryPage;