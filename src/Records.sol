// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract project{

    struct Patient{
        string name;
        string age;
        string email;
        string mobile;
        string aadhar;
    }
    struct Doctor{
        string name;
        string qualification;
        string haddress;
        string regtno;
        string aadhar;
    }
    struct PatientData{
        uint256 sno;
        string description;
        string doctor;
        string date;
        string hash;

    }
    address public owner;
    constructor(){
       owner=msg.sender;
    }
   
    mapping(address=>PatientData[]) data;
    
    Patient [] private patients;
    Doctor [] private doctors;
    mapping(address=>Doctor) docDetails;
    mapping(address=>Patient) accDetails;
    mapping(string=>address) aadharLink;
     mapping(string=>Patient) aadharDetails;
    function addPatient(string memory name,string memory age,string memory email, string memory mobile,string memory aadhar,address padd) external{
        Patient memory p=Patient(name,age,email,mobile,aadhar);
        patients.push(p);
        accDetails[padd]=p;
        aadharDetails[aadhar]=p;
        aadharLink[aadhar]=padd;
    }
    function addDoctor(string memory name,string memory qual,string memory hadd,string memory regtno,string memory aadhar,address dacc) external{
        require(msg.sender==owner,"Only owner is allowed");
        Doctor memory d=Doctor(name,qual,hadd,regtno,aadhar);
        doctors.push(d);
        docDetails[dacc]=d;
    }
    function getDetails(address padd) external view returns(Patient memory) {
        return accDetails[padd];

    }
    function getdocDetails(address dadd) external view returns(Doctor memory) {
        return docDetails[dadd];
    }
    function getAccountByAadhar(string memory aadhar) external view returns(address){
        return aadharLink[aadhar];
    }
    function addPatientData(address padd,string memory description,string memory doctor,string memory date,string memory hash) external {
        uint256 x=data[padd].length+1;
        PatientData memory pd=PatientData(x,description,doctor,date,hash);
        data[padd].push(pd);

    } 
    function getPatientData(address padd) external view returns(PatientData[] memory){
        return data[padd];
    }
    function getDoctorData(address dadd) external view returns(bool){
        Doctor memory d=docDetails[dadd];
        string memory s=d.name;
        if(bytes(s).length>0){
            return true;
        }
        else{
            return false;
        }
    }
function getOwner() external view returns(address){
    return owner;
}

}