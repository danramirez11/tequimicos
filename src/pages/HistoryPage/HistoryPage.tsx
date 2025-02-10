 
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreType } from "../../store/store";
import { fetchReceiptsData } from "../../store/slices/receiptSlice";
import ReceiptHis from "../../components/History/ReceiptHis/ReceiptHis";
import './HistoryPage.css'
import PrintReceipt from "../../components/PrintReceipt/PrintReceipt";
import { Receipt } from "../../types/products";

const HistoryPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { receipts, loading } = useSelector((state: StoreType) => state.receipts)
    const [ receiptToPrint, setReceiptToPrint ] = useState<Receipt | undefined>(undefined);

    useEffect(() => {
        dispatch(fetchReceiptsData())
    }, [])

    const handlePrintReceipt = (receipt: Receipt) => {
        setReceiptToPrint(receipt);

        setTimeout(() => {
            window.print();
            setReceiptToPrint(undefined);
        }, 1000)
    }

    return (
        <section className="page history-page">
            <h1>Historial</h1>

            { loading && <p>Trayendo los datos...</p> }

            <section className="history-receipts">
            { receipts.map((r) => {
                return (
                    <ReceiptHis key={r.id} receipt={r} onPrint={handlePrintReceipt}/>
                )
            })}
            </section>
            <PrintReceipt historyReceipt={receiptToPrint}/>
        </section>
    );
}

export default HistoryPage;