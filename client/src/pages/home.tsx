
import { MdNoteAdd } from "react-icons/md";
import { useEffect } from "react";
import SideBar from "../components/ui/sideBar";
import NoteCard from "../components/ui/noteCard";
import { useNotesStore } from "../store/notesStore";
import { useNavigate } from "react-router-dom";
import PdfUpload from "../components/ui/pdfUpload";
import Loader from "../components/ui/loader";



export function Main() {
  // const { userId } = useParams();
  const notes = useNotesStore((state) => state.notes);
  // console.log("rendedring")
  const fetchNotes = useNotesStore((state) => state.fetchNotes)
  const loading = useNotesStore((state) => state.loading)
    // if (loading) {
    //   return <Loader />
    // }
  useEffect(() => {
    if (notes.length === 0) {
      fetchNotes();
      // console.log("fetchnotes occured isndie home")
    }
    // console.log("notes lenght isndie home is = ",notes.length)
  }, [notes.length, fetchNotes]);
  if (loading) {
      return <Loader />
    }



  return (
    <div className="flex">
      {/* Sidebar */}
      <div className=" border-r-2 border-gray-200 min-w-25 h-screen fixed hidden lg:block">
        <SideBar />
      </div>

      {/* Cards Grid */}
      <GridLayout />
    </div>
  );
}


function GridLayout() {
  const notes = useNotesStore((state) => state.notes)
  const navigate = useNavigate()

  return (
    <div className=" w-full max-w-screen overflow-x-hidden">
      <div className=" flex  justify-center mt-10 ">
        <div className="sm:w-120 sm:h-40   justify-between   w-80 h-40    flex items-center ">
          <div className="sm:w-45 sm:h-45 w-30 h-30  text-left border-4 flex items-center justify-center rounded-3xl border-dashed ">
            <MdNoteAdd className="sm:text-8xl text-6xl" onClick={() => {
              navigate("/editor")
            }} />
          </div>
          <PdfUpload  />
        </div>
      </div>
      <div className=" flex flex-col lg:ml-36 pl-4 pr-4">
        <div className="mt-20 self-center sm:self-start">
          <h1 className="text-6xl font-semibold ">Notes</h1>
        </div>

        <div className="w-full pt-4 border-t-2 border-gray-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes.map((card: any) => (
              <NoteCard
                key={card._id}
                noteId={card._id}
                title={card.title}
                content={card.content}
                subject={card.subject}
                color={card.color}
                fav={card.fav}
                createdAt={card.createdAt}
                updatedAt={card.updatedAt}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}


// lg se jada screen to tb ye krio



//colors  = rgb(254, 201, 113) (yellowish) , rgb(254, 155, 114) browinish,  rgb(221, 232, 140) greenish , rgb(182, 147, 253) purple , rgb(0, 212, 254) blue

//colors  = rgb(254, 201, 113)  , rgb(254, 155, 114) ,  rgb(221, 232, 140)  , rgb(182, 147, 253)  , rgb(0, 212, 254) 
