export const logout = (req,res)=>{
    req.session.destroy();
    res.redirect('/auth/login')
}