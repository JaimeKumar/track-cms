import './App.css';
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery';

import ProjectBox from './ProjectBox.js'
import Person from './Person.js'
import People from './People.js'
import Files from './Files.js'
import CustomSelect from './CustomSelect';
import Chat from './Chat';
import RoleSuggestion from './RoleSuggestion';
import Form from './Form';

import downloadBtnImg from './dlBtn.png'
import addBtnImg from './addBtn.png'
import deleteBtnImg from './deleteBtn.png'
import profileBtnImg from './profileBtn.png'
import friendBtnImg from './friendBtn.png'
import darkmodeBtnImg from './darkModeBtn.png'

import downloadBtnImgDark from './dlBtn-dark.png'
import addBtnImgDark from './addBtn-dark.png'
import deleteBtnImgDark from './deleteBtn-dark.png'
import profileBtnImgDark from './profileBtn-dark.png'
import friendBtnImgDark from './friendBtn-dark.png'
import darkmodeBtnImgDark from './darkModeBtn-dark.png'

import mProjects from './projectsMobile.svg'
import mChat from './chatMobile.svg'
import mFiles from './filesMobile.svg'
import mPeople from './peopleMobile.svg'
import mProfile from './profileMobile.svg'
import mSettings from './settingsMobile.svg'

import mProjectsLight from './projectsMobileLight.svg'
import mChatLight from './chatMobileLight.svg'
import mFilesLight from './filesMobileLight.svg'
import mPeopleLight from './peopleMobileLight.svg'
import mProfileLight from './profileMobileLight.svg'
import mSettingsLight from './settingsMobileLight.svg'


function App() {
  const [profile, setProfile] = useState(
    {
      id: uuidv4(),
      name: 'You',
      email: 'default@email.com',
      friends: [
        {name: 'UKNWN', email: 'me@uknwn.co.uk'},
        {name: 'Maxim Ryder', email: 'maxim@thelifeofmgmt.com'}
      ],
      projects: [
        {
          id: uuidv4(), 
          name: 'Casa',
          people: [
            {name: 'UKNWN', role: 'Artist', email: 'me@uknwn.com', id:uuidv4()},
            {name: 'Jaime LaCree', role: 'Producer', id:uuidv4()},
            {name: 'Tn', role: 'Producer', id:uuidv4()},
            {name: 'Fixupboy', role: 'Featured Artist', id:uuidv4()},
            {name: 'Rob Uche', role: 'Artist & Repertoire', id:uuidv4()},
            {name: 'Maxim Ryder', role: 'Manager', id:uuidv4()}
        ],
          files: [
            {id: uuidv4(), name: 'UKNWN - Casa Producer Agreement.docx', selected: false, cat: 2},
            {id: uuidv4(), name: 'casa - mix 1.mp3', selected: false, cat: 5}, 
            {id: uuidv4(), name: 'casa mix 2.mp3', selected: false, cat: 5}
          ],
          chat: []
        },
        {
          id: uuidv4(), 
          name: 'Pink Notes',
          people: [
            {name: 'Juice Menace', role: 'Artist', id: uuidv4()},
            {name: 'Takjacob', role: 'Producer', id: uuidv4()},
            {name: 'Jaime LaCree', role: 'Mixing Engineer', id: uuidv4()},
            {name: 'Maxim Ryder', role: 'Manager', id: uuidv4()}
        ],
          files: [
            {id: uuidv4(), name: 'mix 1.mp3', selected: false, cat:5}, 
            {id: uuidv4(), name: 'mix 2.mp3', selected: false, cat:5}
          ],
          chat: []
        }
      ],
      mode: [{text: 'Light Mode', selected: false}, {text: 'Dark Mode', selected: true}],
      projSelected: -1
  });

  const [fileCat, setFileCat] = useState({txt: 'All Files', id: 0});
  const [cats, setCats] = useState([
    {txt:'Artwork', id: 1, key: uuidv4()}, 
    {txt:'Contracts', id: 2, key: uuidv4()}, 
    {txt:'Lyrics', id: 3, key: uuidv4()}, 
    {txt:'Masters', id: 4, key: uuidv4()}, 
    {txt:'Mixes', id: 5, key: uuidv4()}, 
    {txt:'Project Files', id: 6, key: uuidv4()}, 
    {txt:'Stems', id: 7, key: uuidv4()}
  ]);
  const [roleSuggestionList, setRoleSuggestsionList] = useState([]);
  const [roleListPos, setRoleListPos] = useState(0);
  const [isAddingProj, setIsAddingProj] = useState(false);
  const [newProjPeople, setNewProjPeople] = useState([]);
  const [friendSuggestions, setFriendSuggestion] = useState([]);
  const [friendListPos, setFriendListPos] = useState(0);
  const [dropdownPos, setDropdownPos] = useState({x: 0, y: 0});
  const [dropDownOptions, setDropdown] = useState([]);
  const [mTitle, setTitle] = useState('Projects');

  const chatInputRef = useRef();
  const roleInputRef = useRef();
  const addPersonNameRef = useRef();
  const addPersonEmailRef = useRef();
  const newProjNameRef = useRef();
  const profileNameRef = useRef();
  const profileEmailRef = useRef();
  const profileNameRefMobile = useRef();
  const profileEmailRefMobile = useRef();
  const friendNameRef = useRef();
  const projEditRef = useRef();
  const friendNameRefMobile = useRef();
  const friendEmailRefMobile = useRef();
  const friendEmailRef = useRef();

  const mChatInputRef = useRef();

  const roleArr = ['Artist', 'Featured Artist', 'Producer', 'Recording Engineer', 'Mixing Engineer', 'Mastering Engineer', 'Artist & Repertoire', 'Manager', 'Cover Art Artist'];
  const projectFunctions = {
    projectSelect: function(id) {
      selectProject(id)
    },
    editProj: function(id) {
      editProject(id)
    },
    projSelected: profile.projSelected
  }

  
  
  // LOAD PROFILE
  useEffect(() => {
    let storedProfile = JSON.parse(localStorage.getItem('trackCMS.profile'));
    if (storedProfile) {setProfile(storedProfile)};
    resize();
  }, [])
  
  // SAVE PROFILE
  useEffect(() => {
    localStorage.setItem('trackCMS.profile', JSON.stringify(profile));
  }, [JSON.stringify(profile)])


  // FUNCTIONS //
  function resize() {
    $('.wholeApp').css('height', window.innerHeight + 'px');
    $('.pages').css('height', window.innerHeight * 0.91 + 'px');
  }

  window.addEventListener('resize', resize);

  function selectProject(id) {
    let index = profile.projects.map(proj => proj.id).indexOf(id);
    setProfile(p => ({
        ...p,
        projSelected: index
    }));
  }

  function expandSelect(e) {
    e.target.parentElement.classList.toggle('fileDropdown')
  }

  function clickedOption(option) {
    let tempCats = [...cats];
    tempCats.push(fileCat);
    tempCats.splice(tempCats.indexOf(option), 1);
    tempCats.sort((a,b) => (a.txt > b.txt) ? 1 : ((b.txt > a.txt) ? -1 : 0));
    setCats([...tempCats]);
    setFileCat(option)

    let tempProjs = [...profile.projects];
    tempProjs[profile.projSelected].files.forEach(f => {
      f.selected = false;
    })
    setProfile(p => ({
      ...p,
      projects: tempProjs
    }))
  }

  function clickFile(id) {
    let projs = [...profile.projects]
    let thisFile = projs[profile.projSelected].files.find(file=>file.id===id);
    thisFile.selected = !thisFile.selected;
    setProfile(p => ({
      ...p,
      projects: projs
    }))

    $('#mainTick').removeClass('ticked');
  }

  function selectAllFiles() {
    if (profile.projSelected < 0) return;
    let allSelected = true;

    if (profile.projects[profile.projSelected].files.length < 1) {
      return;
    }

    let projs = [...profile.projects];
    let visibleFiles = [];
    projs[profile.projSelected].files.forEach(file => {
      if (file.cat === fileCat.id || fileCat.id === 0) {
        visibleFiles.push(file);
      }
    })

    visibleFiles.forEach(file => {
      if (!file.selected) {
        allSelected = false;
        return;
      }      
    });
    
    projs[profile.projSelected].files.forEach(file => {
      if (!allSelected) {
        file.selected = true;
      } else {
        file.selected = false;
      }
    });

    setProfile(p => ({
      ...p,
      projects: projs
    }))

    if (!allSelected) {
      if (profile.mode[0].selected) {
        $('#mainTick').addClass('tickedLight')
        $('#mainTickMobile').addClass('tickedLight')
      } else {
        $('#mainTick').addClass('ticked')
        $('#mainTickMobile').addClass('ticked')
      }
    } else {
      if (profile.mode[0].selected) {
        $('#mainTick').removeClass('tickedLight')
        $('#mainTickMobile').removeClass('tickedLight')
      } else {
        $('#mainTick').removeClass('ticked')
        $('#mainTickMobile').removeClass('ticked')
      }
    }
  }

  function sendMessage() {
    if (profile.projSelected < 0) return;

    let tempProjs = [...profile.projects];

    tempProjs[profile.projSelected].chat.push({
      id: uuidv4(),
      sender: {name: profile.name, id: profile.id},
      message: chatInputRef.current.value || mChatInputRef.current.value
    })


    setProfile(prev => ({
        ...prev,
        name: profileNameRef.current.value,
        email: profileEmailRef.current.value,
        projects: [...tempProjs],
    }));

    chatInputRef.current.value = null;
  }

  function scrollToBottom() {
    if (profile.projSelected < 0) return;
    $('#chatScroll').scrollTop(profile.projects[profile.projSelected].chat.length * 45);
  }
  
  function scrollToBottomMobile() {
    if (profile.projSelected < 0) return;
    $('#chatScrollMobile').scrollTop(profile.projects[profile.projSelected].chat.length * 45);
  }

  function handleKey(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }
  
  function checkMatch(val) {
    if (!val) {
      return [];
    }

    var reg = new RegExp(val.toUpperCase());
    return roleArr.filter(role => {
      if (role.toUpperCase().match(reg)) {
        return role;
      } else return {}
    })
  }

  function checkFriendMatch(val) {
    if (!val) {
      return [];
    }

    var reg = new RegExp(val.toUpperCase());
    return profile.friends.filter(friend => {
      if (friend.name.toUpperCase().match(reg)) {
        return friend;
      }
    })
  }
  
  function showResults(e) {
    nameInputBlur();
    let terms = checkMatch(roleInputRef.current.value);
    setRoleSuggestsionList([...terms]); 

    if (terms.length > 0) {
      $('#result').css('display', 'flex');
    } else {
      $('#result').css('display', 'none');
    }

    if (e.key==='ArrowDown') {
      if (roleListPos + 1 < roleSuggestionList.length) {
        setRoleListPos(prevPos => prevPos + 1);
      }
    } else if (e.key==='ArrowUp') {
      if (roleListPos - 1 > -1) {
        setRoleListPos(prevPos => prevPos - 1);
      }
    } else if (e.key==='Escape') {
      roleInputBlur();
    } else if (e.key==='Enter') {
      if (terms.length > 0) {
        roleSuggestionClicked(roleSuggestionList[roleListPos])
      }
    }
  }

  function showFriends(e) {
    roleInputBlur();
    let suggestions = checkFriendMatch(addPersonNameRef.current.value);
    setFriendSuggestion([...suggestions]);

    if (suggestions.length > 0) {
      $('#friendSuggest').css('display', 'flex')
    } else {
      $('#friendSuggest').css('display', 'none')
    }

    if (e.key==='ArrowDown') {
      if (friendListPos + 1 < friendSuggestions.length) {
        setFriendListPos(prevPos => prevPos + 1);
      }
    } else if (e.key==='ArrowUp') {
      if (friendListPos - 1 > -1) {
        setFriendListPos(prevPos => prevPos - 1);
      }
    } else if (e.key==='Escape') {
      nameInputBlur();
    } else if (e.key==='Enter') {
      if (suggestions.length > 0) {
        friendSuggestionClicked(friendSuggestions[friendListPos].name)
      }
    }
  }

  function roleInputBlur() {
    $('#result').css('display', 'none')
  }
  
  function nameInputBlur() {
    $('#friendSuggest').css('display', 'none')
  }
  
  function roleSuggestionClicked(role) {
    roleInputRef.current.value = role;
    $('#result').css('display', 'none')
  }

  function friendSuggestionClicked(friend) {
    let thisFriend = friendSuggestions.find(f => f.name===friend)
    addPersonNameRef.current.value = thisFriend.name;
    addPersonEmailRef.current.value = thisFriend.email;
    $('#friendSuggest').css('display', 'none')
  }

  function focusOnInput() {
    $('#roleInput').trigger('focus')
  }

  function focusOnName() {
    $('#nameInput').trigger('focus')
  }

  function emailFocused() {
    roleInputBlur();
    nameInputBlur();
  }

  function openAddPerson() {
    if (isAddingProj) {
      $('#newProjGUI').removeClass('show');
      $('#overBox').addClass('show');
      $('#addPersonGUI').addClass('show');
    } else if (profile.projSelected >= 0) {
      $('#overBox').addClass('show');
      $('#addPersonGUI').addClass('show');
    }
  }
  
  function addPerson() {
    let person = {
      email: addPersonEmailRef.current.value.toLowerCase(),
      name: addPersonNameRef.current.value,
      role: roleInputRef.current.value,
      id: uuidv4()
    }

    if (person.email === '' || person.name === '' || person.role === '') return;

    addPersonEmailRef.current.value = null;
    addPersonNameRef.current.value = null;
    roleInputRef.current.value = null;

    if (profile.projSelected >= 0 && !isAddingProj) {
      let copyProjs = [...profile.projects];
      copyProjs[profile.projSelected].people.push(person);
      setProfile(prev => ({
          ...prev,
          projects: [...copyProjs] 
      }))
      $('#overBox').removeClass('show');
      $('#addPersonGUI').removeClass('show');
    } else if (isAddingProj) {
      setNewProjPeople(prev => [...prev, person]);
      $('#addPersonGUI').removeClass('show');
      $('#newProjGUI').addClass('show');
    }
  }

  function closeAddPerson(e) {
    if (isAddingProj) {
      $('#addPersonGUI').removeClass('show')
      $('#newProjGUI').addClass('show')
    } else {
      e.target.parentElement.parentElement.classList.remove('show');
      e.target.parentElement.parentElement.parentElement.classList.remove('show');
    }

    addPersonEmailRef.current.value = null;
    addPersonNameRef.current.value = null;
    roleInputRef.current.value = null;
  }

  function openNewProject() {
    setIsAddingProj(true);
    $('#overBox').addClass('show');
    $('#newProjGUI').addClass('show');
  }

  function addProject() {
    if (newProjPeople.length > 0) {
      let newProj = {
        id: uuidv4(), 
        name: newProjNameRef.current.value,
        people: [...newProjPeople],
        files: [],
        chat: [],
      };

      let newProjs = [...profile.projects];
      newProjs.push(newProj);
      setProfile(prev => ({
          ...prev,
          projects: [...newProjs]
      }))
      
      newProjNameRef.current.value = null;
      setNewProjPeople([]);
      closeNewProj();
    } else {
      // indicate that there must be People ... or must there?
    }
  }

  function closeNewProj() {
    $('#newProjGUI').removeClass('show');
    $('#overBox').removeClass('show');
    setIsAddingProj(false)
  }
  
  function editProfile() {
    $('#profileGUI').addClass('show');
    $('#overBox').addClass('show');
  }
  
  function saveProfile(e, name, email) {
    let thisName = name || profileNameRef.current.value;
    let thisEmail = email || profileEmailRef.current.value;
    let tempProjs = [...profile.projects];
    tempProjs.forEach(proj => {
      proj.chat.forEach(chat => {
        if (chat.sender.id === profile.id) {
          chat.sender.name = thisName;
        }
      })
    })
    
    setProfile(prev => ({
          ...prev,
          name: thisName,
          email: thisEmail.toLowerCase(),
          projects: [...tempProjs]
    }));

    closeProfile();
  }
  
  function closeProfile() {
    $('#profileGUI').removeClass('show');
    $('#overBox').removeClass('show');
  }

  function openAddFriend() {
    $('#addFriendGUI').addClass('show');
    $('#overBox').addClass('show');
  }
  
  function openAddFriendMobile() {
    $('#addFriendLone').addClass('show');
    $('#overBox').addClass('show');
  }
  
  function closeAddFriend() {
    $('#addFriendGUI').removeClass('show');
    $('#overBox').removeClass('show');
    friendNameRef.current.value = null;
    friendEmailRef.current.value = null;
  }

  function closeAddFriendLone() {
    $('#addFriendLone').removeClass('show');
    $('#overBox').removeClass('show');
    friendNameRefMobile.current.value = null;
    friendEmailRefMobile.current.value = null;
  }

  function addFriend() {
    let oldFriends = [...profile.friends];
    let thisEmail = friendEmailRef.current.value || friendEmailRefMobile.current.value;
    oldFriends.push({
      name: friendNameRef.current.value || friendNameRefMobile.current.value,
      email: thisEmail.toLowerCase()
    })
    
    setProfile(prev => ({
        ...prev,
        friends: oldFriends
    }))

    friendNameRef.current.value = null;
    friendEmailRef.current.value = null;
  }

  function editProject(id) {
    selectProject(id);
    $('#editProject').addClass('show');
    $('#overBox').addClass('show'); 
    projEditRef.current.value = profile.projects.find(p => p.id===id).name;
  }

  function projEditDone() {
    let newTitle = projEditRef.current.value;
    let projsCopy = [...profile.projects];
    projsCopy[profile.projSelected].name = newTitle;
    setProfile(prev => ({
        ...prev,
        projects: [...projsCopy]
    }))
    $('#editProject').removeClass('show');
    $('#overBox').removeClass('show'); 
  }
  
  function deleteProject() {
    let copyProjs = [...profile.projects];
    copyProjs.splice(profile.projSelected, 1);
    setProfile(prev => ({
        ...prev,
        projects: [...copyProjs],
        projSelected: 0
    }))
    $('#editProject').removeClass('show');
    $('#overBox').removeClass('show');
  }

  function deselect(e) {
    if (e.target.classList[0] === 'scrollBox') {
      setProfile(prev => ({
          ...prev,
          projSelected: -1
      }))
    }
  }

  function removeFromProject(id) {
    let copyProjs = [...profile.projects];
    copyProjs[profile.projSelected].people.splice(copyProjs[profile.projSelected].people.indexOf(copyProjs[profile.projSelected].people.find(p => p.id===id)), 1);
    setProfile(prev => ({
        ...prev,
        projects: copyProjs
    }))
  }

  function clickPerson(e, id) {
    e.preventDefault();

    let target = {...profile.projects[profile.projSelected].people.find(p=>p.id===id)};
    
    setDropdown([
      {
        text: 'Add Friend',
        act: () => {
          friendNameRef.current.value = target.name;
          friendEmailRef.current.value = target.email;
          addFriend(id);
          $('.dropdown').removeClass('drop');
        }
      },
      {
        text: 'Remove from Project',
        act: () => {
          removeFromProject(id);
          $('.dropdown').removeClass('drop');
        }
      },
      {
        text: 'Edit Role',
        act: () => {
          editRole(target);
          $('.dropdown').removeClass('drop');
        }
      }
    ])

    openDropDown(e);
  }

  function openDropDown(e) {
    let tempPos = {};

    if (e.clientY > (document.body.offsetHeight - (30 * dropDownOptions.length))) {
      tempPos.bottom = (document.body.offsetHeight-e.clientY) + 'px';
    } else {
      tempPos.top = e.clientY + 'px';
    }

    if (e.clientX + 160 > document.body.offsetWidth) {
      tempPos.right = (document.body.offsetWidth-e.clientX) + 'px';
    } else {
      tempPos.left = e.clientX + 'px';
    }

    setDropdownPos({...tempPos});
    
    $('.dropdown').addClass('drop');
  }
  
  function clickAnywhere(e) {
    if (!e.target.className.includes('settings')) {
      $('.dropdown').removeClass('drop');
    }
  }

  function changeMode() {
    let tempMode = profile.mode;
    tempMode.forEach(mode => {
      mode.selected = !mode.selected;
    })
    setProfile(prev => ({
      ...prev,
      mode: tempMode
    }))

    if (profile.mode[0].selected) {
      makeLightMode();
    } else {
      makeDarkMode();
    }
  }
  
  function makeLightMode() {
    $(document.body).css('backgroundColor', 'white');
        
    $(':root').css('--bg1', '#aac2dc');  
    $(':root').css('--bg2', '#d0dde9');
    $(':root').css('--bg3', '#789dc2');
    $(':root').css('--bg4', '#789dc2');
    
    $(':root').css('--fg', '#132e40');
    $(':root').css('--fg2', '#efefff');
    $(':root').css('--fg-slight', '#132e4033');
  }
  
  function makeDarkMode() {
    $(document.body).css('backgroundColor', 'black');
    
    $(':root').css('--bg1', '#0c1b24ff');  
    $(':root').css('--bg2', '#030c11');  
    $(':root').css('--bg3', '#07121a');  
    $(':root').css('--bg4', 'rgb(51, 81, 119)');  
    
    $(':root').css('--fg', '#b6ceebff');
    $(':root').css('--fg2', '#0d2331');
    $(':root').css('--fg-slight', '#acc5dd33');
  }

  function editRole(target) {
    openAddPerson();
    addPersonNameRef.current.value = target.name;
    roleInputRef.current.value = target.role;
    addPersonEmailRef.current.value = target.email;
    $('#finishPerson').css('display', 'flex');
    $('#addPerson').css('display', 'none');
  }
  
  function personEditDone(target) {
    let person = {
      name: addPersonNameRef.current.value,
      email: addPersonEmailRef.current.value.toLowerCase(),
      role: roleInputRef.current.value,
      id: target.id
    }

    let tempProjects = [...profile.projects];
    tempProjects[profile.projSelected].people.splice(tempProjects[profile.projSelected].people.map(p => p.id).indexOf(target.id), 1, person);
    setProfile(prev => ({
      ...prev,
      projects: [...tempProjects]
    }))
    
    addPersonEmailRef.current.value = null;
    addPersonNameRef.current.value = null;
    roleInputRef.current.value = null;
    
    $('#addPersonGUI').removeClass('show')
    $('#overBox').removeClass('show')
    $('#finishPerson').css('display', 'none');
    $('#addPerson').css('display', 'flex');
  }
  
  function openUpload() {
    if (profile.projSelected < 0) return;
    $('#uploadFile').addClass('show')
    $('#overBox').addClass('show')
  }

  function uploadFile() {
    let input = document.getElementById('fileUpload').files;
    let tempProjs = [...profile.projects];
    Object.keys(input).forEach(i => {
      input[i].cat = fileCat.id;
      input[i].selected = false;
      input[i].id = uuidv4();
      tempProjs[profile.projSelected].files.push(input[i]);
    })

    setProfile(p => ({
      ...p,
      projects: tempProjs
    }))
    closeUpload();
  }

  function closeUpload() {
    $('#uploadFile').removeClass('show');
    $('#overBox').removeClass('show');
  }

  function downloadFiles() {
    let selectedFiles = profile.projects[profile.projSelected].files.filter(f => f.selected);
    console.log('would download: ' + selectedFiles);
  }

  function deleteFiles() {
    let tempProjs = [...profile.projects];
    let newFiles = tempProjs[profile.projSelected].files.filter(f => !f.selected);
    tempProjs[profile.projSelected].files = newFiles;
    setProfile(p => ({
      ...p,
      projects: [...tempProjs]
    }))
  }

  function rightClickFile(e, id) {
    let optionsArr = [{text: 'MOVE FILE TO:'}];
    cats.forEach(cat => {
      optionsArr.push({
        text: cat.txt,
        act: () => {moveFile(cat.id, id)}
      })
    })
    setDropdown([...optionsArr])

    openDropDown(e);
  }

  function moveFile(cat, id) {
    let tempProjs = [...profile.projects];
    tempProjs[profile.projSelected].files.find(f => f.id===id).cat = cat;
    setProfile(p => ({
      ...p,
      projects: tempProjs
    }))

    $('.dropdown').removeClass('drop');
  }

  function mButtonClick(e) {
    let pages = $('.page');
    for (var i=0; i < pages.length; i++) {
      $('#' + pages[i].id).css('display', 'none')
    }
    let pageID = '#' + e.target.id + 'page';
    $(pageID).css('display', 'flex');

    switch (e.target.id) {
      case 'mProj':
        setTitle('Projects')
        break;
      case 'mChat':
        setTitle('Chat')
        break;
      case 'mFile':
        setTitle('');
        break;
      case 'mPeople':
        setTitle('People');
        break;
      case 'mProfile':
        setTitle('Profile')
        break;
      default:
        setTitle('Projects')
    }
  }

  function mSave() {
    saveProfile({}, profileNameRefMobile.current.value, profileEmailRefMobile.current.value)
  }

  function toggleMode() {
    changeMode();
    $('.modeToggle').toggleClass('modeOn')
    $('.modeToggleSwitch').toggleClass('modeSwitchOn')
  }

  useEffect(() => {
    if (profile.mode[0].selected) {
      makeLightMode()
    } else {
      makeDarkMode()
    }
  }, [])
  
  return (
    <div className="wholeApp">
      <div className='mainContainer' onClick={clickAnywhere}>
        {/* TOOLBAR */}
        <div className='gridBox' style={{gridRow: '1/3', gridColumn: '1/2'}}>
          <div className='toolbar'>
            <div className='toolbarBtn' onClick={editProfile}>
              {profile.mode.map(mode => {
                if (mode.selected) return;
                if (mode.text === 'Light Mode') {
                  return <img src={profileBtnImg} alt='profile'/>
                } else {
                  return <img src={profileBtnImgDark} alt='profile'/>
                }
              })}
              <p>Profile</p>
            </div>
            <div className='toolbarBtn' onClick={openNewProject}>
              {profile.mode.map(mode => {
                if (mode.selected) return;
                if (mode.text === 'Light Mode') {
                  return <img src={addBtnImg} alt='new project'/>
                } else {
                  return <img src={addBtnImgDark} alt='new project'/>
                }
              })}
              <p>New Project</p>
            </div>
            <div className='toolbarBtn' onClick={openAddFriend}>
              {profile.mode.map(mode => {
                if (mode.selected) return;
                if (mode.text === 'Light Mode') {
                  return <img src={friendBtnImg} alt='Add Friend'/>
                } else {
                  return <img src={friendBtnImgDark} alt='Add Friend'/>
                }
              })}
              <p>Add Friend</p>
            </div>
            <div className='toolbarBtn' onClick={changeMode}>
              {profile.mode.map(mode => {
                if (mode.selected) return;
                if (mode.text === 'Light Mode') {
                  return <img src={darkmodeBtnImg} alt='dark mode or light mode'/>
                } else {
                  return <img src={darkmodeBtnImgDark} alt='dark mode or light mode'/>
                }
              })}
              <p>{profile.mode.map((mode) => {
                if (!mode.selected) {
                  return mode.text;
                }
              })}</p>
            </div>
          </div>
        </div>

        {/* PROJECTS */}
        <div className='gridBox' style={{gridRow: '1/3', gridColumn: '2/3'}}>
          <div className='innerBox'>
            <div className='titleBox lone'>
              <p>Projects</p>
            </div>
            <div className='spaceMaker' style={{height: '85px'}}></div>
            <ProjectBox key={uuidv4()} profile={JSON.stringify(profile)} functions={projectFunctions} deselect={deselect} imgs={[mSettings, mSettingsLight]} />
          </div>
        </div>

        {/* CHAT */}
        <div className='gridBox' style={{gridRow: '1/3', gridColumn: '3/4'}}>
          <div className='innerBox'>
            <div className='titleBox lone'>
              <p>
                Chat
              </p>
            </div>
            <div className='spaceMaker' style={{height: '85px'}}></div>

            <Chat key={uuidv4()} profile={profile} chatInputRef={chatInputRef} handleKey={handleKey} sendMessage={sendMessage} sendScroll={scrollToBottom} m={false}/>
          </div>
        </div>
        
        {/* FILES */}
        <div className='gridBox' style={{gridRow: '1/2', gridColumn: '4/5'}}>
          <div className='innerBox'>
            <CustomSelect key={uuidv4()} profile={profile} clickedOption={clickedOption} expandSelect={expandSelect} fileCat={fileCat} cats={cats} forUpload={false}/>

            <div className='spaceMaker' style={{height: '115px'}}></div>

            <Files key={uuidv4()} profile={profile} fileCat={fileCat} clickFile={clickFile} clickFileRight={rightClickFile} imgs={[mSettings, mSettingsLight]} />

            <div className='buttonsBar'>
              <div className={'longButton ' + profile.mode.find(p => p.selected).text.toLowerCase()} onClick={selectAllFiles}>
                <div id='mainTick' className='tickBox' style={{width: '12.5%', minWidth: '13px', marginRight: '0'}}></div>
                <p>Select All</p>
              </div>
              <div className='button' onClick={downloadFiles}>
                {profile.mode.map(mode => {
                  if (mode.selected) return;
                  if (mode.text === 'Light Mode') {
                    return <img src={downloadBtnImg} alt='download files'/>
                  } else {
                    return <img src={downloadBtnImgDark} alt='download files'/>
                  }
                })}
                <p>Save</p>
              </div>
              <div className='button' onClick={deleteFiles}>
                {profile.mode.map(mode => {
                  if (mode.selected) return [];
                  if (mode.text === 'Light Mode') {
                    return <img src={deleteBtnImg} alt='delete files'/>
                  } else {
                    return <img src={deleteBtnImgDark} alt='delete files'/>
                  }
                })}
                
                <p>Delete</p>
              </div>
              <div className='button' onClick={openUpload}>
                {profile.mode.map(mode => {
                  if (mode.selected) return;
                  if (mode.text === 'Light Mode') {
                    return <img src={addBtnImg} alt='upload file'/>
                  } else {
                    return <img src={addBtnImgDark} alt='upload file'/>
                  }
                })}
                <p>Upload</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* PEOPLE */}
        <div className='gridBox' style={{gridRow: '2/3', gridColumn: '4/5'}}>
          <div className='innerBox' style={{justifyContent: 'space-evenly'}}>
            <div className='titleBox bar'>
              <p>
                People
              </p>
              <div onClick={openAddPerson} className={'longButton ' + profile.mode.find(p => p.selected).text.toLowerCase()} style={{aspectRatio: '4/1', height: '100%'}}>
                <span>+</span> &nbsp; Add Person
              </div>
            </div>
            <People key={uuidv4()} profile={profile} rightClickPerson={clickPerson} imgs={[mSettings, mSettingsLight]} />
          </div>
        </div>

      </div>

      {/* OTHER GUIs */}
      <div id='overBox' className='overBox'>
        <div id='profileGUI' className='overGUI' style={{height: '50%'}}>
          <Form key={uuidv4()} profile={profile} nameRef={profileNameRef} emailRef={profileEmailRef}/>

          <div className="buttonsBar forOverGUI">
            <div className="longButton cancel" onClick={closeProfile}>Cancel</div>
            <div className="longButton confirm" onClick={saveProfile}>Save</div>
          </div>
        </div>

        <div id='newProjGUI' className="overGUI">
            <div className="guiInner">
              <span>Project Name</span>
              <input ref={newProjNameRef}></input>
              <div className="titleBox">
                <span style={{fontSize: '17px', height: '30px', width: '100%'}}>
                  People
                </span>
                <div onClick={openAddPerson} className='longButton' style={{aspectRatio: '7/1', height: '100%'}}>
                  <span>+</span> &nbsp; Add Person
                </div>
              </div>
                
              <div className="scrollBox" style={{height: '50%'}}>
                {newProjPeople.map(p => {
                  return <Person key={uuidv4()} person={p} imgs={[]} />
                })}
              </div>
            </div>
            <div className="buttonsBar forOverGUI">
              <div className="longButton cancel" onClick={closeNewProj}>Cancel</div>
              <div className="longButton confirm" onClick={addProject}>Add Project</div>
            </div>
        </div>

        <div id='addFriendGUI' className="friendGUI">
          <div className="overGUI" style={{display: 'flex', width: '45%', height: '100%'}}>
            <div className='guiInner' style={{height: '90%'}}>
              <span>Name</span>
              <input ref={friendNameRef} onFocus={roleInputBlur}></input>
              <span>Email</span>
              <input ref={friendEmailRef} onFocus={roleInputBlur}></input>
            </div> 
            <div className="buttonsBar forOverGUI">
              <div className="longButton confirm" onClick={addFriend}>Add Friend</div>
              <div className="longButton cancel" onClick={closeAddFriend}>Done</div>
            </div>
          </div>

          <div className="overGUI" style={{display: 'flex', width: '45%', height: '100%', padding: '30px'}}>
            <div className="titleBox">
              <span style={{marginBottom: '10px'}}>
                Friends
              </span>
            </div>
            <div className="scrollBox" style={{height: '100%'}}>
                  {profile.friends.map(p => {
                    return <div className='projectBox' style={{height: '60px'}}>
                              <h1 style={{fontSize: '17px'}}>{p.name}</h1>
                              <span className='friendEmail'>{p.email}</span>
                            </div>
                  })}
            </div>
          </div>
          
        </div>

        <div id='addFriendLone' className="overGUI" style={{height: '70%'}}>
            <div className='guiInner' style={{height: '90%'}}>
              <span>Name</span>
              <input ref={friendNameRefMobile} onFocus={roleInputBlur}></input>
              <span>Email</span>
              <input ref={friendEmailRefMobile} onFocus={roleInputBlur}></input>
            </div> 
            <div className="buttonsBar forOverGUI">
              <div className="longButton confirm" onClick={addFriend}>Add Friend</div>
              <div className="longButton cancel" onClick={closeAddFriendLone}>Done</div>
            </div>
          </div>

        <div id='addPersonGUI' className='overGUI'>
          <div className='guiInner'>
            <span>Name</span>
            <div className="roleInputContainer">
              <input autoComplete='off' ref={addPersonNameRef} onFocus={showFriends} id='nameInput' onKeyUp={showFriends}></input>
              <div className="roleSuggestions" id='friendSuggest'>
                  <ul className='friendList'>
                    <li style={{height: '40px', backgroundColor: '#0a192400'}} onClick={focusOnName}></li>
                    {friendSuggestions.map((friend, i) => {
                      let focused = false;
                      if (i === friendListPos) {focused = true}
                      return <RoleSuggestion key={uuidv4()} role={friend.name} roleClicked={friendSuggestionClicked} highlighted={focused}/>
                  })}
                  </ul>
              </div>
            </div>
  
            <span>Email</span>
            <input ref={addPersonEmailRef} onFocus={emailFocused}></input> 

            <span>Role</span>
            <div className="roleInputContainer">
              <input autoComplete='off' ref={roleInputRef} type='text' name='role' id='roleInput' onKeyUp={showResults} onFocus={showResults}></input>
              <div className='roleSuggestions' id='result'>
                <ul className='roleList'>
                  <li style={{height: '40px', backgroundColor: '#0a192400'}} onClick={focusOnInput}></li>
                  {roleSuggestionList.map((role, i) => {
                    let focused = false;
                    if (i === roleListPos) {focused = true}
                    return <RoleSuggestion key={uuidv4()} role={role} roleClicked={roleSuggestionClicked} highlighted={focused}/>
                  })}
                </ul>
              </div>  
            </div>
          </div> 
          <div className="buttonsBar forOverGUI">
            <div className="longButton cancel" onClick={closeAddPerson}>Cancel</div>
            <div id='finishPerson' className="longButton confirm" style={{display: 'none'}} onClick={personEditDone}>Confirm</div>
            <div id='addPerson' className="longButton confirm" onClick={addPerson}>Add Person</div>
          </div>
        </div>

        <div id='editProject' className="overGUI" style={{height: '350px'}}>
          <div className="guiInner">
            <span>Project Name</span>
            <input ref={projEditRef}></input>
          </div>

          <div className="buttonsBar forOverGUI">
            <div className="longButton cancel" onClick={deleteProject} style={{backgroundColor: '#441111', color: '#ddd'}}>Delete</div>
            <div className="longButton confirm" onClick={projEditDone}>Done</div>
          </div>
        </div>

        <div id='uploadFile' className="overGUITwo">
          <div className="guiInner" style={{position: 'relative'}}>
            <CustomSelect key={uuidv4()} profile={profile} clickedOption={clickedOption} expandSelect={expandSelect} fileCat={fileCat} cats={cats} forUpload={true}/>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <input className='uploadInput' type='file' id='fileUpload' multiple style={{backgroundColor: '#00000000'}}></input>
            </div>
          </div>
          <div className="buttonsBar forOverGUI">
            <div className="longButton cancel" onClick={closeUpload}>Cancel</div>
            <div className="longButton confirm" onClick={uploadFile}>Upload</div>
          </div>
        </div>
      </div>
      
      {/* MOBILE */}
      <div className="mContainer" onClick={clickAnywhere}>
        <div className="pages">
            <h1>{mTitle}</h1>
            
            {/* PROJECTS */}
            <div className='page' id="mProjpage" style={{display: 'flex'}}>
              <ProjectBox key={uuidv4()} profile={JSON.stringify(profile)} functions={projectFunctions} deselect={deselect} imgs={[mSettings, mSettingsLight]} />
              <div onClick={openNewProject} className={'mButton ' + profile.mode.find(p => p.selected).text.toLowerCase()}>
                <span>+</span>
              </div>
            </div>
            
            {/* CHAT */}
            <div className='page' id="mChatpage">
              <Chat key={uuidv4()} profile={profile} chatInputRef={mChatInputRef} handleKey={handleKey} sendMessage={sendMessage} sendScroll={scrollToBottomMobile} m={true}/>
            </div>

            {/* FILES */}
            <div className="page" id='mFilepage'>
              <div className='spaceMaker' style={{height: '65px'}}></div>
              <CustomSelect key={uuidv4()} profile={profile} clickedOption={clickedOption} expandSelect={expandSelect} fileCat={fileCat} cats={cats} forUpload={false}/>

              <div className='spaceMaker' style={{height: '20px'}}></div>

              <Files key={uuidv4()} profile={profile} fileCat={fileCat} clickFile={clickFile} clickFileRight={rightClickFile} m={true} imgs={[mSettings, mSettingsLight]} />

              <div className='buttonsBar'>
                <div className={'longButton ' + profile.mode.find(p => p.selected).text.toLowerCase()} onClick={selectAllFiles}>
                  <div id='mainTickMobile' className='tickBox' style={{width: '12.5%', minWidth: '13px', marginRight: '0'}}></div>
                  <p>Select All</p>
                </div>
                <div className='button' onClick={downloadFiles}>
                  {profile.mode.map(mode => {
                    if (mode.selected) return;
                    if (mode.text === 'Light Mode') {
                      return <img src={downloadBtnImg} alt='download files'/>
                    } else {
                      return <img src={downloadBtnImgDark} alt='download files'/>
                    }
                  })}
                  <p>Save</p>
                </div>
                <div className='button' onClick={deleteFiles}>
                  {profile.mode.map(mode => {
                    if (mode.selected) return [];
                    if (mode.text === 'Light Mode') {
                      return <img src={deleteBtnImg} alt='delete files'/>
                    } else {
                      return <img src={deleteBtnImgDark} alt='delete files'/>
                    }
                  })}
                  
                  <p>Delete</p>
                </div>
                <div className='button' onClick={openUpload}>
                  {profile.mode.map(mode => {
                    if (mode.selected) return;
                    if (mode.text === 'Light Mode') {
                      return <img src={addBtnImg} alt='upload file'/>
                    } else {
                      return <img src={addBtnImgDark} alt='upload file'/>
                    }
                  })}
                  <p>Upload</p>
                </div>
              </div>
            </div>

            {/* PEOPLE */}
            <div className="page" id='mPeoplepage'>
              <People key={uuidv4()} profile={profile} rightClickPerson={clickPerson} imgs={[mSettings, mSettingsLight]}/>
              <div className="mButtonCont">
                <div onClick={openAddPerson} className={'mButton ' + profile.mode.find(p => p.selected).text.toLowerCase()}>
                  <span>+</span>
                </div>
              </div>
            </div>

            {/* PROFILE */}
            <div className="page" id='mProfilepage'>
              <br />
              <span>Name</span>
              <input ref={profileNameRefMobile} defaultValue={profile.name}></input>
              <br />
              <span>Email</span>
              <input ref={profileEmailRefMobile} defaultValue={profile.email}></input>
              <br />
              <span>Friends</span>
              <div className="relativeBox" style={{height: '150px'}} >
                <div className="scrollBox" style={{position: 'relative', marginTop: '0px'}}>
                      {profile.friends.map(p => {
                        return <div className='projectBox' style={{height: '50px'}}>
                                  <b style={{fontSize: '0.8rem'}}>{p.name}</b>
                                  <span className='friendEmail'>{p.email}</span>
                                </div>
                      })}
                </div>
                  
                <div onClick={openAddFriendMobile} className={'mButton ' + profile.mode.find(p => p.selected).text.toLowerCase()}>
                  <span>+</span>
                </div>
              </div>
              <br />
              <span>Light Mode</span>
              <div className="modeToggle" onClick={toggleMode}>
                <div className="modeToggleSwitch"/>
              </div>      
              
              <br />
              <div className="spaceMaker" style={{height: '30px'}}></div>
              <div className="mSave" onClick={mSave}>Save</div>
            </div>
        </div>

        <div className="bottomBar">
          <div className="button" id='mProj' onClick={mButtonClick}>
            {profile.mode.map(mode => {
              if (mode.selected) return;
              if (mode.text === 'Light Mode') {
                return <img src={mProjects} id='mProj' alt="Projects"/>
              } else {
                return <img src={mProjectsLight} id='mProj' alt="Projects"/>
              }
            })}
            <p id='mProj'>Projects</p>
          </div>

          <div className="button" id='mPeople' onClick={mButtonClick}>
            {profile.mode.map(mode => {
              if (mode.selected) return;
              if (mode.text === 'Light Mode') {
                return <img src={mPeople} id='mPeople' alt="People"/>
              } else {
                return <img src={mPeopleLight} id='mPeople' alt="People"/>
              }
            })}
            <p id='mPeople'>People</p>
          </div>

          <div className="button" id='mChat' onClick={mButtonClick}>
            {profile.mode.map(mode => {
              if (mode.selected) return;
              if (mode.text === 'Light Mode') {
                return <img src={mChat} id='mChat' alt="Chat"/>
              } else {
                return <img src={mChatLight} id='mChat' alt="Chat"/>
              }
            })}
            <p id='mChat'>Chat</p>
          </div>

          <div className="button" id='mFile' onClick={mButtonClick}>
            {profile.mode.map(mode => {
              if (mode.selected) return;
              if (mode.text === 'Light Mode') {
                return <img src={mFiles} id='mFile' alt="Files"/>
              } else {
                return <img src={mFilesLight} id='mFile' alt="Files"/>
              }
            })}
            <p id='mFile'>Files</p>
          </div>

          <div className="button" id='mProfile' onClick={mButtonClick}>
            {profile.mode.map(mode => {
              if (mode.selected) return;
              if (mode.text === 'Light Mode') {
                return <img src={mProfile} id='mProfile' alt="Profile"/>
              } else {
                return <img src={mProfileLight} id='mProfile' alt="Profile"/>
              }
            })}
            <p id='mProfile'>Profile</p>
          </div>
        </div>

      </div>

      {/* CUSTOM CONTEXTMENU */}
      <div className='dropdown' style={dropdownPos}>
        {dropDownOptions.map((option) => {
          return (
            <div className='dropdownOption' onClick={option.act}>
              {option.text}
            </div>
          )
        })}
      </div>

    </div>
    
  );
}

export default App;
