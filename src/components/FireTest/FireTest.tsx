import { useSelector } from "react-redux"
import { StoreType } from "../../store/store"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../services/firebaseConfig"

const FireTest = () => {
    const combinations = useSelector((state: StoreType) => state.combinations.combinations)
    const lids = useSelector((state: StoreType) => state.lids.lids)

    const distop24 = async () => {
        const badId = '287bc121-4038-436a-83bf-d1259302d049'
        const goodId = '4bc35cdb-e7fb-477e-98fd-e42f47e18544'

        const goodLid = lids.find((lid) => lid.id === goodId)

        if (!goodLid) {
            console.error("Good lid not found!");
            return;
        }

        for (let i = 0; i < combinations.length ; i++) {

            if (combinations[i].lids.some((lid) => lid.id === badId)) {
                console.log(`${combinations[i].name} has bad lid`)

                /*const updatedLids = combinations[i].lids.map((l) => l.id === badId ? goodLid : l)

                const updatedDoc = {...combinations[i], lids: updatedLids}

                try {
                    const comboDoc = doc(db, 'combinations', combinations[i].id)
                    await setDoc(comboDoc, updatedDoc)

                    console.log(`${combinations[i].name} updated with good lid`)
                } catch (error) {
                    console.log('Error updating combination', error)
                }*/
            } else if (combinations[i].lids.some((lid) => lid.id === goodId)) {

                const actualLid = combinations[i].lids.find((lid) => lid.id === goodId)

                const isBadLid = actualLid?.pack ? true : false

                if (isBadLid){
                    console.log(`${combinations[i].name} needs change ${combinations[i].id}`)

                }
            } 
        }
    }

    const distopLarga = async () => {
        const badIds = ['40ec6f08-2b8f-4be6-98c5-ca911be326ba', '7e61e01c-1124-47b0-8a03-60c64f1c61e8']
        const goodId = '630346e3-4ca2-4ec3-94aa-df66084bfe8b'

        const goodLid = lids.find((lid) => lid.id === goodId)

        if (!goodLid) {
            console.error("Good lid not found!");
            return;
        }

        for (let i = 0; i < combinations.length ; i++) {

            if (combinations[i].lids.some((lid) => badIds.includes(lid.id))) {
                console.log(`${combinations[i].name} has bad lid`)

                const updatedLids = combinations[i].lids.map((l) => badIds.includes(l.id) ? goodLid : l)

                const updatedDoc = {...combinations[i], lids: updatedLids}

                /*try {
                    const comboDoc = doc(db, 'combinations', combinations[i].id)
                    await setDoc(comboDoc, updatedDoc)

                    console.log(`${combinations[i].name} updated with good lid`)
                } catch (error) {
                    console.log('Error updating combination', error)
                }*/
            } else if (combinations[i].lids.some((lid) => lid.id === goodId)) {
                
                const actualLid = combinations[i].lids.find((lid) => lid.id === goodId)

                const isBadLid = actualLid?.pack ? true : false

                if (isBadLid){
                    console.log(`${combinations[i].name} needs change ${combinations[i].id}`)
                }
            } 
        }
    }

    const pushPull28 = async () => {
        const goodId = '4d44a1a5-d912-4d11-b95e-ee32c0229150'
        const badId = '77163bb6-1bfc-4778-b840-3ddb4f93ebb0'

        const goodLid = lids.find((lid) => lid.id === goodId)

        if (!goodLid) {
            console.error("Good lid not found!");
            return;
        }

        for (let i = 0; i < combinations.length ; i++) {

            if (combinations[i].lids.some((lid) => lid.id === badId)) {
                console.log(`${combinations[i].name} has bad lid`)

                const updatedLids = combinations[i].lids.map((l) => l.id === badId ? goodLid : l)

                const updatedDoc = {...combinations[i], lids: updatedLids}

                /*try {
                    const comboDoc = doc(db, 'combinations', combinations[i].id)
                    await setDoc(comboDoc, updatedDoc)

                    console.log(`${combinations[i].name} updated with good lid`)
                } catch (error) {
                    console.log('Error updating combination', error)
                }*/
            } else if (combinations[i].lids.some((lid) => lid.id === goodId)) {
                console.log(`${combinations[i].name} has good lid, nothing done!`)
            }
        }
    }

    const sprayLarga = async () => {
        const goodId = '00de47b0-1873-4fda-a695-78f4dd885e44'
        const badId = 'b7c5b345-a0c5-461f-868e-38865f2ea508'

        const goodLid = lids.find((lid) => lid.id === goodId)

        if (!goodLid) {
            console.error("Good lid not found!");
            return;
        }

        for (let i = 0; i < combinations.length ; i++) {

            if (combinations[i].lids.some((lid) => lid.id === badId)) {
                console.log(`${combinations[i].name} has bad lid`)

                const updatedLids = combinations[i].lids.map((l) => l.id === badId ? {...l, id: goodLid.id, name: goodLid.name} : l)

                console.log(updatedLids)

                const updatedDoc = {...combinations[i], lids: updatedLids}

                try {
                    const comboDoc = doc(db, 'combinations', combinations[i].id)
                    await setDoc(comboDoc, updatedDoc)

                    console.log(`${combinations[i].name} updated with good lid`)
                } catch (error) {
                    console.log('Error updating combination', error)
                }
            } else if (combinations[i].lids.some((lid) => lid.id === goodId)) {
                console.log(`${combinations[i].name} has good lid, nothing done!`)
            }
        }
    }

    const distopLujo = async () => {
        const badId = 'd2ebb068-a327-4777-ba29-8083a5223031'
        const goodId = 'd4605cec-33c8-4e85-8047-0a094258588c'

        const goodLid = lids.find((lid) => lid.id === goodId)

        if (!goodLid) {
            console.error("Good lid not found!");
            return;
        }

        for (let i = 0; i < combinations.length ; i++) {

            if (combinations[i].lids.some((lid) => lid.id === badId)) {
                console.log(`${combinations[i].name} has bad lid`)

                const updatedLids = combinations[i].lids.map((l) => l.id === badId ? { ...l, name: goodLid.name, id: goodLid.id} : l)

                const updatedDoc = {...combinations[i], lids: updatedLids}

                try {
                    const comboDoc = doc(db, 'combinations', combinations[i].id)
                    await setDoc(comboDoc, updatedDoc)

                    console.log(`${combinations[i].name} updated with good lid`)
                } catch (error) {
                    console.log('Error updating combination', error)
                }
            } else if (combinations[i].lids.some((lid) => lid.id === goodId)) {
                console.log(`${combinations[i].name} has good lid, nothing done!`)
            }
        }
    }

    const distop20 = async () => {
        const badId = '91379f81-e9e1-46e0-9977-f8872961eab6'

        for (let i = 0; i < combinations.length ; i++) {

            if (combinations[i].lids.some((lid) => lid.id === badId)) {
                console.log(`${combinations[i].name} has bad lid`)

                const updatedLids = combinations[i].lids.filter((l) => l.id !== badId)

                const updatedDoc = {...combinations[i], lids: updatedLids}

                try {
                    const comboDoc = doc(db, 'combinations', combinations[i].id)
                    await setDoc(comboDoc, updatedDoc)

                    console.log(`${combinations[i].name} updated with good lid`)
                } catch (error) {
                    console.log('Error updating combination', error)
                }
            }
        }
    }

    const lazo = async () => {
        const lidWithLazo = '0a29a52f-308f-4c99-abf9-b287332a4f7a'
        const lidId = 'bfe937dc-15a6-4d73-81fe-64c09ef07271'

        const lidgotero = lids.find((lid) => lid.id === lidId)

        const actualLidLazo = lids.find((lid) => lid.id === lidWithLazo)

        console.log(lidgotero?.name, lidgotero?.colors)

        try {
            const lidLazoDoc = doc(db, 'lids', lidWithLazo)
            await setDoc(lidLazoDoc, {...actualLidLazo, colors: lidgotero?.colors})

            console.log(`${actualLidLazo?.name} updated with colors`)
            
        } catch (error) {
            console.log('Error adding colors', error)
        }
    }

    const distop2818 = async () => {
        const lidId = '1bf6460f-f99b-41d4-aeeb-6709a9c98cdd'

        const lid = lids.find((l) => l.id === lidId)

        combinations.forEach(async (combo) => {
            if (combo.lids.some((lid) => lid.id === lidId)) {
                console.log(`${combo.name} has bad lid`)

                const updatedLids = combo.lids.map((l) => l.id === lidId ? {...l, name: 'Tapa Distop 18'} : l)

                const updatedDoc = {...combo, lids: updatedLids}


                try {
                    const comboDoc = doc(db, 'combinations', combo.id)
                    await setDoc(comboDoc, updatedDoc)

                    console.log(`${combo.name} updated with good lid`)
                } catch (error) {
                    console.log('Error updating combination', error)
                    
                }

                try {
                    const lidDoc = doc(db, 'lids', lidId)
                    await setDoc(lidDoc, {...lid, name: 'Tapa Distop 18'})
                } catch (error) {
                    console.log('Error updating lid', error)
                }
            }
        })
    }

    const gotero12 = async () => {
        const goteroId = '14d427be-fd2d-47cf-b405-3082dc6f9add'
        const goteroPitorroId = 'b675be6a-5e6b-4b3d-abef-47bd7c101c8b'

        const gotero = lids.find((l) => l.id === goteroId)
        const goteroPitorro = lids.find((l) => l.id === goteroPitorroId)

        try {
            const goteroDoc = doc(db, 'lids', goteroPitorroId)
            await setDoc(goteroDoc, {...goteroPitorro, colors: gotero?.colors})

            console.log(`${goteroPitorro?.name} updated with colors`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            FireTest

            <button onClick={() => {}}>boton hpta</button>
        </div>
    )
}

export default FireTest;