function logout()
{
   localStorage.removeItem('bestgotoken');
   pageRedirect('user.html');
}