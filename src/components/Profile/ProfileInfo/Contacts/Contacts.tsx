import {Link} from "react-router-dom";
import React from "react";
import styled from "styled-components";
import vk from  "../../../common/icon/iconForProfileInfo/icons8-vk.svg"
import instagram from  "../../../common/icon/iconForProfileInfo/icons8-instagram.svg"
import facebook from  "../../../common/icon/iconForProfileInfo/icons8-facebook.svg"
import gitHub from  "../../../common/icon/iconForProfileInfo/icons8-github.svg"
import twitter from  "../../../common/icon/iconForProfileInfo/twitterIcon.svg"
import webSite from  "../../../common/icon/iconForProfileInfo/domainIcon.png"
import youtube from  "../../../common/icon/iconForProfileInfo/icons8-youtube-play.svg"

type ContactsPropsType = {
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string

    }
}

export const Contacts = (props: ContactsPropsType) => {

    const {contacts} = props

    const icons = [facebook,webSite,vk,twitter,instagram,youtube,gitHub]

    const keys = Object.keys(contacts);
    const values = Object.values(contacts);
    const contactsArray = keys.map((key, index) => ({
        title: key,
        url: values[index],
        icon:icons[index]
    }));

    const contactsLink = contactsArray.map(link => {
        return (
            <>
                {!!link.url && <li><Link target="_blank" to={link.url}><img src={link.icon}/></Link></li>}
            </>
        )
    })

    return (
        <UlStyle >
            {contactsLink}
        </UlStyle>
    )
}

const UlStyle = styled.ul`
  display: flex;
  
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0;
  margin: 0 ;
  font-size: 24px;
  gap:20px;
  & li {
    list-style-type: none;
  }
`