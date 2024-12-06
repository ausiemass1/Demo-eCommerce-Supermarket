const brandModel = require("../models/brandModel");
const conn = require("../config/dbConfig");

exports.getBrands = async (req, res) => {
  try {
    const results = await brandModel.getBrands();
    res.render("admin/brands.ejs", { results }); // TO DO: brands.ejs to be created
  } catch (error) {
    console.log(error);
  }
};

exports.editBrand = async (req, res) => {
  try {
    const brandId = req.params.id;
    const results = await brandModel.editBrand(brandId);
    res.render("admin/brandEdit", { record: results[0] });
  } catch (error) {
    console.log("Error retriving edit Form:", error);
  }
};
exports.updateBrand = async (req,res)=>{
    try{
        const brandId = req.params.id;

       await brandModel.updateBrand(brandId, req.body.brand_name)
       req.flash('success_msg', "Brand Updated successfully");
        res.redirect('/admin/brand')

    }catch(error){
        console.log('Failed to update database: ' , error)
    }
};

exports.insertBrandForm = (req, res)=>{
  res.render('admin/brandInsert')
};
exports.insertBrand = async (req,res)=>{
  await brandModel.insertBrand(req.body.brand_name);
  req.flash('success_msg', "Brand inserted successfully");
  res.redirect('/admin/insertbrand')
};

exports.deleteBrand = async (req,res)=>{
  const brandId  = req.params.id;
  await brandModel.deleteBrand(brandId);
  res.redirect('/admin/brand')
};