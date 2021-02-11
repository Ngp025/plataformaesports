import supportModel from './supportModel.json';

function appClassicSupportContent(supportNavHandler) {
  var supportFaqs = document.getElementById('support-faq');
  var isRender = [];
  function newFaqClickHandler() {
    for (var prop in supportModel) {
      prop === event.target.id
        ? supportNavHandler(supportModel[event.target.id])
        : '';
    }
  }
  function renderFaqs() {
    for (var prop in supportModel) {
      var newFaq = document.createElement('div');
      newFaq.setAttribute('id', `${prop}`);
      newFaq.setAttribute('class', 'faq modal-trigger');
      newFaq.innerText = supportModel[prop].question;
      supportFaqs.appendChild(newFaq);
      newFaq.onclick = () => {
        newFaqClickHandler();
      };
      newFaq.setAttribute('data-target', 'help-modal');
      isRender.push('yes');
    }
  }

  if (supportFaqs) {
    supportFaqs.childNodes.length === 0 ? renderFaqs() : '';
  }
}

function dinamicSupportContent() {}

const supportContent = {
  appClassicSupportContent: appClassicSupportContent,
  dinamicSupportContent: dinamicSupportContent,
};

export default supportContent;
