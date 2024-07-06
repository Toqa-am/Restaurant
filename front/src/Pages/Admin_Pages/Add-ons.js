import axios from "axios"
import { useEffect, useState } from "react"
import Message from "../../Componenets/Message";
import ReactPaginate from "react-paginate";
// const setAuthorizationHeader = () => {
//     const token = localStorage.getItem('AdminToken');
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     } else {
//       console.warn('AdminToken is not available in localStorage.');
//     }
//   };

export default function Add_ons() {

    const [showError, setShowError] = useState(false);

    const [canShow, setCanShow] = useState(false)



    const handleShowError = () => {
        setShowError(true);
    };

    const handleCloseError = () => {
        setShowError(false);
    };

    const [data, setData] = useState([]);
    let [addon, setAddon] = useState({});
    // const [name, setName] = useState("");
    const [updated, setUpdated] = useState();
    let [i, setI] = useState()
    let [desc, setDesc] = useState()
    let [cost, setCost] = useState()
    let [categId, setCategId] = useState()
    let [status, setStatus] = useState()
    let [image, setImage] = useState()
    let [errorMsg, setErrorMsg] = useState({ msg: "", type: "" })
    const [message, setMessage] = useState(null);
    const [currentPage, setcurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [isLoaded, setisLoaded] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [categories, setCategories] = useState([])
    const [nameFilter, setNameFilter] = useState('');
    const [costFilter, setCostFilter] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [all, setAll] = useState([])
    // const namePatern=RegExp(`/^(?=(?:[\p{L}\s\'&]{0,}[\p{L}]){3,50}$)[\p{L}\s\'&]*$/u`);
    // const descPattern=RegExp(`/^\s*\S(?:.*\S)?\s*$/u`);
    // console.log(descPattern.test("kkkkkkkkkkeewesfg")) 

    const [filterForm, setfilterForm] = useState({
        nameFilter: null,
        costFilter: null,
        statusFilter: null,
        typeFilter: null,
        categoryFilter:null
    });


    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleInputChange1 = (e) => {
        setfilterForm((prevFilterForm) => ({
            ...prevFilterForm,
            [e.target.id]: e.target.value,
        }));

    };

    // const handleInputChange2 = (e) => {
    //     setInputValue2(e.target.value);
    // };

    const handleFilter = async (e) => {
        e.preventDefault();
        const payload = {};
        
        if (filterForm.statusFilter && !filterForm.nameFilter && !filterForm.costFilter && !filterForm.typeFilter && !filterForm.categoryFilter) {
            payload.status = filterForm.statusFilter;
            getAddons(`http://127.0.0.1:8000/api/admin/addons/status/${payload.status}`)
        }
        else {
            if (!filterForm.nameFilter && !filterForm.costFilter && !filterForm.typeFilter && !filterForm.categoryFilter) {
                setData(all);
            }
            else if (filterForm.nameFilter || filterForm.costFilter || filterForm.typeFilter || filterForm.categoryFilter) {
                
                console.log(filterForm.typeFilter)

                try {
                    let allAddons = await getAddons();

                    // console.log(allAddons)

                    console.log(data)
                    // setData(allAddons)
                    // const filteredAddons = data.filter(item =>    (item.name.toLowerCase().includes(filterForm.nameFilter.toLowerCase())) || (item.cost >= filterForm.costFilter && item.cost < filterForm.costFilter + 1) || ((item.cost >= filterForm.costFilter && item.cost < filterForm.costFilter + 1) && item.name.toLowerCase().includes(filterForm.nameFilter.toLowerCase()))  );
                    const filteredAddons = allAddons.filter(item => {
                        let matchesNameFilter = true;
                        let matchesCostFilter = true;
                        let matchesStatusFilter = true;
                        let matchesTypeFilter = true;
                        let matchesCategoryFilter = true;

                        if (filterForm.nameFilter) {
                            matchesNameFilter = item.name.toLowerCase().includes(filterForm.nameFilter.toLowerCase());
                        }

                        if (filterForm.costFilter) {
                            matchesCostFilter = (item.cost >= Number(filterForm.costFilter) && item.cost < Number(filterForm.costFilter) + 1);
                        }
                        if (filterForm.statusFilter) {
                            if (filterForm.statusFilter !== "Non"){
                                if (filterForm.statusFilter === "active") {
                                    matchesStatusFilter = item.status === 1;
    
                                }
                                else if (filterForm.statusFilter === "inactive") {
                                    matchesStatusFilter = item.status === 0;
    
                                }
                            }
                            
                        }
                        console.log(filterForm.typeFilter)

                        if (filterForm.typeFilter) {
                            if(filterForm.typeFilter !=="Non"){
                                console.log(item.type)
                                matchesTypeFilter = item.type === filterForm.typeFilter;
                            }
                            
                        }
                        if (filterForm.categoryFilter) {
                            if (filterForm.categoryFilter !== "Non") {
                            matchesCategoryFilter = item.category_id === Number(filterForm.categoryFilter);
                            }
                        }
                        console.log("gkgmk");
                        console.log(matchesNameFilter)
                        console.log(matchesCostFilter)
                        console.log(matchesStatusFilter)

                        return matchesNameFilter && matchesCostFilter && matchesStatusFilter && matchesTypeFilter && matchesCategoryFilter;
                    });

                    setData(
                        filteredAddons
                    )
                    // setFilteredData(filteredAddons);
                    console.log(data)

                }
                catch (error) {
                    console.error('Error fetching addons:', error);
                }



            }
            console.log(payload);
            console.log(filterForm);
        }
        // Handle form submission logic here
        // console.log('Input 1:', inputValue1);
        // console.log('Input 2:', inputValue2);
    };


    const cancelFilters = () => {
        setData(all)
    }


    const handlePageChange = (selectedObject) => {

        setcurrentPage(selectedObject.selected);
        console.log(currentPage)
        handleFetch();
    };


    const handleFetch = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/addons?page=${currentPage + 1}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',

                    //   "Content-Type": "application/json" // Optional, depending on your API
                }
            })
            setData(response.data.data)
            console.log(response.data);
        }
        catch {

        }

    }

    const handleShowMessage = (msg, type) => {

        setCanShow(false);
        setTimeout(() => {
            setCanShow(true);
            setMessage({ text: msg, type });
        }, 3000);
    };

    const handleCloseMessage = () => {
        setMessage(null);
    };
    const token = JSON.parse(localStorage.getItem('AdminToken'));

    const [formData, setFormData] = useState({

        name: '',
        cost: 0,
        status: '',
        description: '',
        img: null,
        category_id: null

    });

    const [formDataErrors, setFormDataErrors] = useState({

        name: '',
        cost: "",
        status: '',
        description: '',
        img: "",
        category_id: ""

    });

    const handleInputChange = (event) => {
        const { name, value, type, files } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'file' ? files[0] : value,
        }));
        if (name === "name") {
            setI(event.target.value)

        }
        else if (name === "cost") {
            setCost(event.target.value)

        }
        else if (name === "description") {
            setDesc(event.target.value)
            console.log(formData.description)


        }
        else if (name === "img") {
            setImage(files[0])
            console.log(formData.img)

        }
    };

    const handleCheckboxChange = (event) => {
        const { name, value, checked } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: checked ? value : '',
        }));
        // console.log(value);
        // setStatus(value)
        if (event.target.id === "active") {
            setStatus(1)
        }
        else if (event.target.id === "inactive") {
            setStatus(0)
        }
    };
    const handleSelect = (event) => {
        const { name, value, selected } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            category_id: Number(value),
        }));
        console.log(value);
        setCategId(value)
    };
    const getAddons = async (endPoint = "http://127.0.0.1:8000/api/admin/addons") => {
        try {
            const addons = await axios.get(endPoint, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',

                    //   "Content-Type": "application/json" // Optional, depending on your API
                }
            })
            setAll(addons.data.data)
            setData(addons.data.data)
            console.log(addons.data)
            setisLoaded(true);
            setPageCount(addons.data.pagination.last_page)
            return all;
        }
        catch (error) {

        }
    }
    useEffect(() => {

        getAddons();
        getCategories()
        console.log(categories);

    }, [updated]);

    const getCategories = async (id) => {
        try {
            const addon = await axios.get(`http://127.0.0.1:8000/api/categories`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',

                    //   "Content-Type": "application/json" // Optional, depending on your API
                }
            })
            setCategories(addon.data.data)

        }
        catch (error) {
            console.log(error)

        }
    }

    const getAddonById = async (id) => {
        try {
            const addon = await axios.get(`http://127.0.0.1:8000/api/addons/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',

                    //   "Content-Type": "application/json" // Optional, depending on your API
                }
            })
            setAddon(addon.data.data)
            console.log(addon.data.data)
            // console.log(addon.data.data);
            // console.log(i)
            setI(addon.data.data.name)
            setDesc(addon.data.data.description)
            setCost(addon.data.data.cost)
            setCategId(addon.data.data.category_id)
            setStatus(addon.data.data.status)
            if (addon.data.data.status === 0) {
                // formData.status.push('inactive')
                formData.status = 'inactive'


            }
            else if (addon.data.data.status === 1) {
                // formData.status.push('active')
                formData.status = 'active'

            }
            setFormData({
                name: addon.data.data.name,
                cost: addon.data.data.cost,
                description: addon.data.data.description,
                img: addon.data.data.image

            })

            console.log(formData)
        }
        catch (error) {
            console.log(error)

            console.log(formData)

        }
    }
    const saveData = async (e, item) => {
        e.preventDefault();
        console.log(formData)

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            console.log(key)


            if (key === 'status') {
                if (value == "active") {
                    formDataToSend.append(key, 1);

                }
                else if (value == "inactive") {
                    formDataToSend.append(key, 0);

                }


            }
            else if (key === 'img') {
                if (value !== null && typeof value !== "string") {
                    formDataToSend.append("image", value);
                    console.log(value)
                }


            }
            else if (key === 'category_id') {

                formDataToSend.append("category_id", value);




            }

            else {

                formDataToSend.append(key, value);

            }
            //   console.log(formDataToSend.entries()["image"].value)
            for (var key of formDataToSend.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }
        });
        if (formData.status == "active") {
            data.status = 1
        }
        else if (formData.status == "inactive") {
            data.status = 0
        }
        console.log(formDataToSend)
        axios.post(`http://127.0.0.1:8000/api/admin/addons/${item.id}`, formDataToSend, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',

                //   "Content-Type": "application/json" // Optional, depending on your API
            },
            params: {
                _method: 'PUT'
            }
        })
            .then(response => {
                console.log(response.data);
                // console.log(data);
                setFormData({
                    name: "",
                    cost: null,
                    status: null,
                    description: "",
                    img: null
                })
                if (response.data.status == 'success') {
                    setErrorMsg({
                        msg: "Done!",
                        type: "success"
                    })

                }
                setUpdated(!updated)

            })
            .catch(error => {
                console.error('There was an error!', error.response);
                // if (error.response.data.errors.image) {
                //     setErrorMsg({ msg: "Please upload an image!", type: "error" })
                // }
                // else if (error.response.data.errors) {
                //     setErrorMsg({ msg: "Please enter all required fields!", type: "error" })

                // }

                if (typeof error.response.data.message !== 'undefined') {
                    if (error.response.data.message.includes("required")) {
                        setErrorMsg({ msg: "Please enter all required fields!", type: "error" })
                    }
                    else if (error.response.data.message === "Unauthenticated.") {
                        setErrorMsg({ msg: ",,,Unauthenticated! please login again", type: "error" })

                    }
                }
                else if (typeof error.response.data.error !== 'undefined') {
                    if (error.response.data.error.includes("exists")) {
                        setErrorMsg({ msg: "An Addon with the same name exists", type: "error" })
                    }

                }
                else {
                    setErrorMsg({ msg: "no", type: "error" })

                }

                setUpdated(!updated)

            });


    };

    function containsNumber(str) {
        // Check if the string contains any digit between 0 and 9
        return /\d/.test(str);
    }
    const addData = async (e) => {
        console.log(formData);
        e.preventDefault();
        if (formData.name === "") {
            setFormDataErrors(prevErrors => ({
                ...prevErrors,
                name: "Item name is required"
            }));

        }
        else if (formData.name.length < 3 || formData.name.length > 50 || containsNumber(formData.name)) {
            setFormDataErrors({
                ...formDataErrors, name: "Name should be between 3 to 50 letters, shouldn't start with white spaces or special characters"
            })
        }
        else {
            setFormDataErrors({
                ...formDataErrors, name: ""
            })
        }
        console.log(formDataErrors);
        if (formData.description === "") {
            setFormDataErrors({
                ...formDataErrors, description: "Item Description is required"
            })
        }
        else if (formData.description.length < 10 || formData.description.length > 255) {
            setFormDataErrors({
                ...formDataErrors, description: "Description should be at least 10 characters and not more than 255"
            })
        }

        else {
            setFormDataErrors({
                ...formDataErrors, description: ""
            })
        }

        if (formData.cost === null || formData.cost === "") {
            setFormDataErrors({
                ...formDataErrors, description: "Item Cost is required"
            })
        }
        else if (formData.cost < 1) {
            setFormDataErrors({
                ...formDataErrors, description: "Cost should be more than 1"
            })
        }
        else {
            setFormDataErrors({
                ...formDataErrors, description: ""
            })
        }
        if (formData.status === null) {
            setFormDataErrors({
                ...formDataErrors, status: "Status is required"
            })
        }
        else {
            setFormDataErrors({
                ...formDataErrors, status: ""
            })
        }
        console.log(formData.img);

        if (formData.img === null) {
            setFormDataErrors({
                ...formDataErrors, description: "Image is required"
            })

        }
        else if (!formData.img.type.includes("jpeg" || "png" || "jpg" || "gif" || "bmp" || "svg")) {
            // console.log(formData.img[0].type);
            setFormDataErrors({
                ...formDataErrors, description: "Image should be of type jpeg, png or jpg"
            })
        }
        else {
            setFormDataErrors({
                ...formDataErrors, description: ""
            })
        }

        if (formData.category_id === null || formData.category_id === "") {
            setFormDataErrors({
                ...formDataErrors, category_id: "Category is required"
            })
        }

        else {
            setFormDataErrors({
                ...formDataErrors, category_id: ""
            })
        }

        if (formDataErrors.category_id === "" && formDataErrors.name === "" && formDataErrors.cost === "" && formDataErrors.status === "" && formDataErrors.img === "" && formDataErrors.description === "") {
            console.log(formDataErrors);
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                console.log(key)


                if (key === 'status') {
                    if (value == "active") {
                        formDataToSend.append(key, 1);

                    }
                    else if (value == "inactive") {
                        formDataToSend.append(key, 0);

                    }


                }
                else if (key === 'img') {
                    formDataToSend.append("image", value);
                    console.log(value)

                }
                else if (key === 'category_id') {

                    formDataToSend.append("category_id", value);




                }

                else {

                    formDataToSend.append(key, value);

                }
                //   console.log(formDataToSend.entries()["image"].value)
                for (var key of formDataToSend.entries()) {
                    console.log(key[0] + ', ' + key[1]);
                }
            });
            if (formData.status == "active") {
                data.status = 1
            }
            else if (formData.status == "inactive") {
                data.status = 0
            }
            axios.post(`http://127.0.0.1:8000/api/admin/addons`, formDataToSend, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',

                    //   "Content-Type": "application/json" // Optional, depending on your API
                }
            })
                .then(response => {
                    // console.log(response.data);
                    if (response.data.status == 'success') {
                        setErrorMsg({
                            msg: "Done!",
                            type: "success"
                        })

                    }
                    setUpdated(!updated)


                })
                .catch(error => {

                    console.error('There was an error!', error);

                    if (typeof error.response.data.message !== 'undefined') {
                        if (error.response.data.message.includes("required")) {
                            setErrorMsg({ msg: "Please enter all required fields!", type: "error" })
                        }
                        else if (error.response.data.message === "Unauthenticated.") {
                            setErrorMsg({ msg: "Unauthenticated! please login again", type: "error" })

                        }
                    }
                    else if (typeof error.response.data.error !== 'undefined') {
                        if (error.response.data.error.includes("exists")) {
                            setErrorMsg({ msg: "An Addon with the same name exists", type: "error" })
                        }

                    }
                    else {
                        setErrorMsg({ msg: "no", type: "error" })

                    }





                }
                );
        }
        // handleShowMessage(errorMsg.msg, errorMsg.type)


        setInterval(handleShowMessage(errorMsg.msg, errorMsg.type)
            , 5000)
        setUpdated(!updated)
        // handleShowMessage(errorMsg.msg, errorMsg.type)

    };

    // const addData = async (e) => {
    //     e.preventDefault();
    //     console.log(item);

    //     try {


    //         const response = await axios.post(`http://127.0.0.1:8000/api/addons`, formData);
    //         // Save in database
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    const deleteItem = async (e, id) => {
        e.preventDefault();

        console.log(id)

        axios.delete(`http://127.0.0.1:8000/api/admin/addons/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',

                //   "Content-Type": "application/json" // Optional, depending on your API
            }
        })
            .then(response => {
                console.log(response.data);

                setUpdated(!updated)

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (
        <>

            <div className="db-pg">
                <h4 className="p-2"> Dashboard /Add-ons</h4>

                <div style={{ background: "#ffffff" }}>
                    <div className="table p-2">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h5> Add-Ons</h5>

                            </div>

                            <div>
                                {/* buttons */}
                                <button className="btn btn-primary rounded" type="button" data-bs-toggle="offcanvas" data-bs-target="#Add-ons-offcanvas" aria-controls="Add-ons-offcanvas"><i className="fa-solid fa-plus text-primary"></i> Add Item</button>
                                <button className="btn btn-primary rounded" onClick={toggleExpand}>
                                    <i className="fa-solid fa-filter text-primary"></i>
                                    {isExpanded ? 'Hide Filter' : ' Filter'}
                                </button>

                                {isExpanded && (
                                    <form className="col-12" onSubmit={handleFilter} >
                                        <div className="d-flex justify-content-between">
                                            <div className="mb-3 mr-3">
                                                <label htmlFor="nameFilter" className="form-label">Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="nameFilter"
                                                    // value={inputValue1}
                                                    onChange={handleInputChange1}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="costFilter" className="form-label">Cost</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="costFilter"
                                                    // value={inputValue2}
                                                    onChange={handleInputChange1}
                                                />
                                            </div>


                                        </div>

                                        <label>Category</label>
                                        <select className="form-select mb-3" aria-label="Default select category" id="categoryFilter" onChange={handleInputChange1} name="category_id">
                                        <option selected value="Non">Non</option>
                                            {categories.map((cat) => (
                                                <option value={cat.id}   >{cat.name}</option>
                                            ))}

                                        </select>

                                        <label htmlFor="typeFilter" className="form-label">Type</label>

                                        <select className="form-select mb-3" aria-label="Default select type" id="typeFilter" onChange={handleInputChange1}>
                                            <option selected>Non</option>
                                            <option value="vegetarian" selected>Vegetarian</option>
                                            <option value="non-vegetarian">Non-Vegetarian</option>

                                        </select>

                                        <label htmlFor="statusFilter" className="form-label">Status</label>

                                        <select className="form-select mb-3" aria-label="Default select example" id="statusFilter" onChange={handleInputChange1}>
                                            <option selected>Non</option>
                                            <option value="active" selected>Active</option>
                                            <option value="inactive">Inactive</option>

                                        </select>
                                        <button type="submit" className="btn btn-primary" >Submit</button>
                                        <button type="button" className="btn btn-outline-secondary" onClick={cancelFilters} > Cancel all Filters</button>
                                    </form>
                                )}
                                <div class="offcanvas offcanvas-end" tabindex="-1" id="Add-ons-offcanvas" aria-labelledby="Add-ons-offcanvasLabel">
                                    <div class="offcanvas-header">
                                        <h5 class="offcanvas-title" id="Add-ons-offcanvasLabel">Add  new Item</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div class="offcanvas-body">
                                        <form>
                                            <div className="d-flex">
                                                <div class="mb-3">
                                                    <label for="name" class="form-label">Name <sapan className="text-danger">*</sapan></label>
                                                    <input type="text" name="name" class="form-control" id="name" required onChange={handleInputChange} />
                                                    <span className="text-danger">{formDataErrors.name}</span>

                                                </div>
                                                <div class="mb-3">
                                                    <label for="cost" class="form-label ml-2">Cost <sapan className="text-danger">*</sapan></label>
                                                    <input type="number" name="cost" class="form-control ml-2" id="cost" required onChange={handleInputChange} />
                                                    <span className="text-danger">{formDataErrors.cost}</span>

                                                </div>
                                            </div>
                                            <label for="status" class="form-label ml-2">Status <sapan className="text-danger">*</sapan></label>

                                            <div className="d-flex ">

                                                <div className="form-check pb-3 pr-5">
                                                    <input className="form-check-input" type="radio" name="status" id="active" checked onChange={handleCheckboxChange} />
                                                    <label className="form-check-label" for="active">
                                                        Active
                                                    </label>
                                                </div>
                                                <div className="form-check pb-3">
                                                    <input className="form-check-input" type="radio" name="status" id="inactive" onChange={handleCheckboxChange} />
                                                    <label className="form-check-label" for="inactive">
                                                        Inactive
                                                    </label>
                                                </div>
                                                <span className="text-danger">{formDataErrors.status}</span>

                                            </div>
                                            <div>
                                                <label>Category</label>
                                                <select onChange={handleSelect} name="category_id">
                                                    {categories.map((cat) => (
                                                        <option value={cat.id}   >{cat.name}</option>
                                                    ))}

                                                </select>
                                                <span className="text-danger">{formDataErrors.category_id}</span>

                                            </div>
                                            <div class="mb-3">
                                                <label for="img" class="form-label">Upload image here</label>
                                                <input class="form-control" name="img" type="file" id="img" onChange={handleInputChange} />
                                                <span className="text-danger">{formDataErrors.img}</span>

                                            </div>
                                            <div class="mb-3">
                                                <label for="desc" class="form-label">Description <sapan className="text-danger">*</sapan></label>
                                                <input type="text-area" name="description" class="form-control" id="desc" required onChange={handleInputChange} />
                                                <span className="text-danger">{formDataErrors.description}</span>
                                            </div>
                                            <button type="submit" class="btn btn-primary" onClick={(e) => { addData(e); }}><i class="fa-regular fa-circle-check"></i> Save</button>
                                            {message &&

                                                canShow && (

                                                    <Message
                                                        message={message.text}
                                                        type={message.type}
                                                        onClose={handleCloseMessage}
                                                    />
                                                )}

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <table class="table">
                            <thead>
                                <tr>
                                    <td scope="col" className=" text-secondary">Name</td>
                                    <td scope="col" className=" text-secondary">Cost</td>
                                    <td scope="col" className=" text-secondary">Status</td>
                                    <td scope="col" className=" text-secondary">Image</td>
                                    <td scope="col" className=" text-secondary">Description</td>

                                    <td scope="col" className=" text-secondary">Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.cost}</td>
                                        {item.status === 0 ?
                                            <td className="status-active">Inactive</td> :
                                            <td className="status-active">Active</td>
                                        }
                                        <td><img src={`http://127.0.0.1:8000/storage/${item.image}`} width={50} height={50}></img></td>
                                        <td>{item.description}</td>
                                        <td>
                                            <div className="d-flex justify-content-around">
                                                <button class="btn delete btn-sm" onClick={(e) => deleteItem(e, item.id)}><i class="fa fa-trash"></i></button>
                                                <button class="btn view btn-sm"><i class="fa fa-eye"></i></button>

                                                {/* <button className="btn btn-danger" onClick={(e) => deleteItem(e, item.id)}><i class="fa-solid fa-trash"></i></button> */}

                                                {/* offCnvas */}
                                                <button class=" btn edit btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={() => getAddonById(item.id)} ><i class="fa-regular fa-pen-to-square"></i></button>

                                                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                                    <div class="offcanvas-header">
                                                        <h5 class="offcanvas-title" id="offcanvasRightLabel">Add  new Item</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                    </div>
                                                    <div class="offcanvas-body">
                                                        <form enctype="multipart/form-data" >
                                                            <div className="d-flex">
                                                                <div class="mb-3">
                                                                    <label for="name" class="form-label">Name <sapan className="text-danger">*</sapan></label>
                                                                    <input name="name" type="text" class="form-control" id="name" required value={i} onChange={handleInputChange} />
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label for="cost" class="form-label ml-2">Cost <sapan className="text-danger">*</sapan></label>
                                                                    <input name="cost" type="number" class="form-control ml-2" id="cost" required value={cost} onChange={handleInputChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <label for="status" class="form-label ml-2">Status <sapan className="text-danger">*</sapan></label>

                                                            <div className="d-flex ">

                                                                <div className="form-check pb-3 pr-5">
                                                                    <input className="form-check-input" type="radio" name="status" id="active" onChange={handleCheckboxChange} value="active" checked={(status === 1 ? true : false)} />
                                                                    <label className="form-check-label" for="active">
                                                                        Active
                                                                    </label>
                                                                </div>
                                                                <div className="form-check pb-3">
                                                                    <input className="form-check-input" type="radio" name="status" id="inactive" onChange={handleCheckboxChange} value="inactive" checked={(status === 0 ? true : false)} />
                                                                    <label className="form-check-label" for="inactive">
                                                                        Inactive
                                                                    </label>
                                                                </div>

                                                            </div>
                                                            <div>
                                                                <label>Category</label>
                                                                <select value={categId} onChange={handleSelect} name="category_id">
                                                                    {categories.map((cat) => (
                                                                        <option value={cat.id} selected={(categId === cat.id ? true : false)} >{cat.name}</option>
                                                                    ))}

                                                                </select>
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="img" class="form-label">upload Image here</label>
                                                                <input class="form-control" name="img" type="file" id="img" onChange={handleInputChange} />
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="desc" class="form-label">Description <sapan className="text-danger">*</sapan></label>
                                                                <input name="description" type="text" class="form-control" id="desc" required value={desc} onChange={handleInputChange} />
                                                            </div>
                                                            <button type="submit" class="btn btn-primary" onClick={(e) => saveData(e, addon)}><i class="fa-regular fa-circle-check"></i> Save</button>                                        </form>
                                                    </div>
                                                </div>
                                                {/* offCnvas */}

                                            </div>
                                        </td>
                                    </tr>

                                ))}


                            </tbody>
                        </table>

                    </div>
                    {isLoaded ? (
                        <div className='w-50 m-auto'>
                            <ReactPaginate
                                pageCount={pageCount}
                                pageRange={2}
                                marginPagesDisplayed={2}
                                onPageChange={handlePageChange}
                                containerClassName={'containerr'}
                                previousLinkClassName={'pagee'}
                                breakClassName={'pagee'}
                                nextLinkClassName={'pagee'}
                                pageClassName={'pagee'}
                                disabledClassNae={'disabledd'}
                                activeClassName={'activee'}
                            />
                        </div>
                    ) : (
                        <div>Nothing to display</div>
                    )}

                </div>

            </div>

        </>
    )
}