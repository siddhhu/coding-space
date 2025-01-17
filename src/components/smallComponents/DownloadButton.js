import React, { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useSolution } from "../../hooks/useFirestore"
import Modal from "./Modal"

const DownloadButton = ({ color, challengeDetails }) => {
  const [showModal, setShowModal] = useState(false)
  const [downloadingModal, setDownloadingModal] = useState(false)
  const { currentUser } = useAuth()
  const { addSolution } = useSolution("solutions")
  const downloadAssets = async () => {
    if (currentUser) {
      window.open(challengeDetails[0].challengeAssets, "_blank", "noopener,noreferrer")
      await addSolution(...challengeDetails)
      setDownloadingModal(true)
    } else {
      setShowModal(true)
    }
  }
  return (
    <>
      <button
        className={`${color} text-gray-300 font-semibold shadow-md py-3 px-5 rounded-xl text-base focus:outline-none block w-48`}
        onClick={() => downloadAssets()}
      >
        <i className="animate-bounce fas fa-arrow-down mr-2"></i>Download
      </button>
      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          title="Oops! Look like you aren't logged in"
          emoji="😌"
        />
      ) : null}
      {downloadingModal ? (
        <Modal
          auth
          setShowModal={setDownloadingModal}
          title="Thanks for downloading a Coding Space challenge."
          emoji="🙏"
        />
      ) : null}
    </>
  )
}

export default DownloadButton
