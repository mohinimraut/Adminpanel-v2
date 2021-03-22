import React from "react";
import Modal from "react-responsive-modal";
import Select from "react-select";

import "./Shopdetails.css";
class Shopdetails extends React.Component {
  state = {
    shopid: "",
    shopaddress: "",
    productname: "",
    productcostprice: "",
    productsellingprice: "",
    productcategory: "",
    _id: {},
    text2: "",
    text: "",
    mygrades: [{ _id: 1, grade: "loading" }],
    myproducts: [{ _id: 1, productname: "loading" }],
    myshops: [{ _id: 1, shopname: "loading" }],
    sform: false,
    sign: false,
    login: false,
    message: "",
  };
  componentDidMount() {
    fetch("http://localhost:5000/getShops")
      .then((res) => res.json())
      .then((res2) => {
        console.log("fvvvvv" + JSON.stringify(res2));
        this.setState({
          mygrades: res2,
        });
      });
  }
  handleSubmit(e) {
    e.preventDefault();

   

    var data = new URLSearchParams();

    for (const pair of new FormData(e.target)) {
    
      data.append(pair[0], pair[1]);
    }
   
    fetch("http://localhost:5000/addShop", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((res2) => {
        this.setState({
          mygrades: [...this.state.mygrades, res2],
        });
      });
    alert("Shop added successfully");
  }

  
  
  deleteGrade(id) {
    alert(id);
   

    fetch("http://localhost:5000/removeshop/" + id, { method: "delete" })
      .then((res) => res.json())
      .then((res2) => {
        console.log(res2);
        const newGrades = this.state.mygrades.filter((item) => {
          return item._id !== res2._id;
        });

        this.setState({ mygrades: newGrades });
      });
  }
  onOpenModal = (object) => {
    this.setState({
      sign: true,
      shopname: object.shopname,
      _id: object._id,
      shopaddress: object.shopaddress,
      shopid: object._id,
    });
   
  };

  onOpenModalLogin = () => {
    this.setState({ login: true });
  };
  moveProductDetail = (list) => {
    this.props.history.push("/addproducttest", { list });
    
  };

  onCloseModal = () => {
    this.setState({ sign: false });
  };

  onCloseModalclose = () => {
    this.setState({ login: false });
  };

  handleChangeProductName = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChangeCostPrice = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChangeSellingPrice = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  Sizehandle = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChangeCategory = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeDen = (e) => {
    console.log(e);
    this.setState({ density: e.target.value });
    
  };

  impFunction = (e) => {
    console.log(e);
    this.setState({ impurity: parseFloat(e.target.value) });
    this.props.onChange(e);
  };
  clearInput(e) {
    console.log(this.state.min);
    this.setState({});
  }

  render() {
    var obj = JSON.stringify(this.state.selectedOption);

    var obj2 = JSON.stringify(this.state.selectedOption2);

  
    var average = (parseFloat(this.state.min) + parseFloat(this.state.max)) / 2;

    const { selectedOption } = this.state;

    const { selectedOption2 } = this.state;
    const { login, sign } = this.state;
    const list = this.state.mygrades.map((item) => {
      console.log("20marchitem", item);
      return (
        <div>
          <a className="collection-item" key={item._id} id="shoplistcollecont">
         
            <a
              onClick={this.moveProductDetail.bind(this, item)}
              id="shoplistingdetails"
            >
              <div id="listingitems">
                <div>Shop Name : {item.shopname}</div>
                {/* <a
                class="material-icons right waves-light blue"
                onClick={() => this.deleteGrade(item._id)}
              >
                Delete
              </a> */}

                <div>Address : {item.shopaddress}</div>
              </div>
            </a>
          </a>

          <div style={{ background: "green" }}>
            {this.state.showForm ? this.showForm(item._id) : null}
          </div>
        </div>
      );
    });

    return (
      <div className="container-fluid">
        <div class="container register-form">
          <div class="form" style={{ border: "1px solid rgb(158, 158, 158)" }}>
            <div class="note">
              <p id="shopheadparam">Shop Registration</p>
            </div>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      name="shopname"
                      placeholder="Shop Name"
                      value={this.state.text}
                      onChange={(e) => this.setState({ text: e.target.value })}
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      name="shopaddress"
                      placeholder="Shop Address"
                      value={this.state.text2}
                      onChange={(e) => this.setState({ text2: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="waves-effect waves-light btn"
                id="btnaddcrtshp"
              >
                Add
              </button>
            </form>
          </div>
          <div className="collection">
            <div style={{ fontSize: "20px" }}>Shop Lists</div>

            {list}
          </div>
        </div>

        <div>
          <div
            className="navbar-collapse collapse in"
            id="navbarMain"
            aria-expanded="true"
            style={{ top: "65px" }}
          >
            <ul className="nav navbar-nav navbar-right"></ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Shopdetails;



