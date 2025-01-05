import React from "react";
import ParentNavBar from "../../components/navbar";
import "../index.css";
import { Bell, NotebookTabs, GraduationCap, Shapes, Megaphone } from "lucide-react";

const Parent_Portal = () => {
  return (
    <div className="parent_container">
      <div className="parent_content">
        <div className="parent_topbar">
          <NotebookTabs size={35} className="parent_topbar_icon" />
          <div className="bell_container">
            <Bell size={20} className="bell_icon" />
            <div className="badger"></div>
          </div>
        </div>
        <div className="child_container">
          <div className="child_top">
            <GraduationCap size={50} className="child_top_icon" />
            <div className="child_top_detail">
              <h4>Emmanuel Nyangazi</h4>
              <p>Code: APU-03015</p>
              <p>Address: Lilongwe</p>
            </div>
          </div>
          <hr />
          <div className="child_bottom">
            <div className="child_bottom_card">
                <h3>Class</h3>
                <p>Form 2</p>
              </div>
            <div className="child_bottom_card">
                <h3>Av. Mark</h3>
                <p>89%</p>
              </div>
            <div className="child_bottom_card">
                <h3>Position</h3>
                <p>3</p>
              </div>
          </div>
        </div>

        {/* Best Subjects */}

        <div className="best_container">
            <h3><Shapes size={20} className={'parents_icons'} /> Best Subjects</h3>
          <div className="best_subjects">
            <div className="best_subject_card">
              <div className="best_subject_card_left">
                <h4>Mathematics</h4>
                <p>Grade: A</p>
              </div>
              <div className="best_subject_card_right">
                <p>90%</p>
              </div>
            </div>
            <div className="best_subject_card">
              <div className="best_subject_card_left">
                <h4>English</h4>
                <p>Grade: A</p>
              </div>
              <div className="best_subject_card_right">
                <p>90%</p>
              </div>
            </div>
            <div className="best_subject_card">
              <div className="best_subject_card_left">
                <h4>Biology</h4>
                <p>Grade: A</p>
              </div>
              <div className="best_subject_card_right">
                <p>90%</p>
              </div>
            </div>
            <div className="best_subject_card">
              <div className="best_subject_card_left">
                <h4>Life Skills</h4>
                <p>Grade: A</p>
              </div>
              <div className="best_subject_card_right">
                <p>90%</p>
              </div>
            </div>
            <div className="best_subject_card">
              <div className="best_subject_card_left">
                <h4>Geography</h4>
                <p>Grade: A</p>
              </div>
              <div className="best_subject_card_right">
                <p>90%</p>
              </div>
            </div>
            <div className="best_subject_card">
              <div className="best_subject_card_left">
                <h4>Science</h4>
                <p>Grade: A</p>
              </div>
              <div className="best_subject_card_right">
                <p>90%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Best Subjects */}



        {/* Notification */}

        <div className="parent_notifications">
          <div className="notification_topper">
          <h3><Megaphone size={20} className={'parents_icons'} /> Notifications</h3>
          <p>View all</p>
          </div>
          <div className="parent_notificcation_content">
            <div className="notification_card">
              <div className="notification_card_left">
                <h4>23</h4>
                <p>June</p>
              </div>
              <div className="notification_card_right">
                <h5>Closing Of School With immediate effect</h5>
                <p>Atsikana Pa Ulendo Schools</p>
              </div>
            </div>
            <div className="notification_card">
              <div className="notification_card_left">
                <h4>23</h4>
                <p>June</p>
              </div>
              <div className="notification_card_right">
                <h5>Closing Of School With immediate effect</h5>
                <p>Atsikana Pa Ulendo Schools</p>
              </div>
            </div>
            
          </div>
        </div>

        {/* Notification */}
        <ParentNavBar />
      </div>
    </div>
  );
};

export default Parent_Portal;
