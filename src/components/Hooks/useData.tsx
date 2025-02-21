import axios from 'axios';

const useData = () => {
    const getData = async ({token}: {token: string }) => {
        let res;
        try {
            res = await axios.get("/api/data/read", {
                headers: {
                    authorization: token,
                }
            });
        } catch (error) {
            
        }
        return res;
    };

    const postData = async (payload: {name: string, contact: string, token: string}) => {
        let res;
        try {
            res = await axios.post("/api/data/create", {title: payload?.name, contact: Number(payload?.contact), token: payload?.token});
        } catch (error) {
            
        }
        return res;
    }

    const deleteData = async (payload: {token: string, id: number}) => {
        let res;
        try {
            res = await axios.delete(`/api/data/delete`, {
                headers: {
                    authorization: payload?.token,
                },
                data: {
                    id: payload?.id,
                }
            });
        } catch (error) {
            
        }
        return res;
    }

    const updateData = async (payload: {token: string, id: number, name: string, contact: string,}) => {
        let res;
        try {
            res = await axios.post("/api/data/update", {
               
                    id: payload?.id,
                    title: payload?.name,
                    contact: Number(payload?.contact),
                    token: payload?.token,
                
            });
        } catch (error) {
            
        }
        return res;
    }

    return {
        getData,
        postData,
        deleteData,
        updateData,
    }
}

export default useData;