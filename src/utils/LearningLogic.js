export default class LearningLogic {
  constructor({ expectedResult }) {
    this.expectedResult = expectedResult;
    this.epoch = 0;
    this.epochHistory = [];
    this.step = 0;
    this.stepResult = null;
    this.prevStepResult = null;
    this.behaviour = [];
    this.adapted = null;
  }

  get learnedBehaviour() {
    return this.behaviour;
  }

  get isAdapted() {
    return this.adapted;
  }

  #adapted() {
    this.adapted = true;
  }

  #resetState() {
    this.epochHistory = [];
    this.step = 0;
    this.stepResult = null;
    this.prevStepResult = null;
  }

  #makeVote() {
    let vote = 0;

    if (this.prevStepResult) {
      if ((this.stepResult.position.x > this.prevStepResult.position.x) && this.stepResult.position.x <= this.expectedResult.x) {
        vote += 1;
      }

      if ((this.stepResult.position.y > this.prevStepResult.position.y) && this.stepResult.position.y <= this.expectedResult.y) {
        vote += 1;
      }
    } else {
      vote += 1;
    }

    return vote;
  }

  async #processEpoch() {
    let i = 0;

    do {
      this.behaviour.push(this.epochHistory[i].value);
      i++;

    } while (this.epochHistory[i]?.vote !== 0 && i <= this.epochHistory.length - 1);

    if (this.behaviour.length === this.epochHistory.length) {
      this.#adapted();
    }

    try {
      await fetch('/api/behaviour', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: this.behaviour })
      });
    } catch (error) {
      console.error(`Error: ${error}`);
    }

    this.#resetState();
  }

  async processStepResult(value) {
    this.prevStepResult = this.stepResult;
    this.stepResult = value;

    const vote = this.#makeVote();

    if (vote) {
      this.epochHistory.push({ step: this.step, value, vote: this.#makeVote() });
      this.step++;
    } else {
      await this.saveEpoch();
    }

    return vote;
  }

  shiftStep() {
    return this.behaviour.shift();
  }

  async getEpoch(id) {
    try {
      const data = await fetch(`/api/epoch/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  async saveEpoch() {
    const payload = {
      id: this.epoch++,
      data: this.epochHistory
    };

    try {
      await fetch('/api/epoch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      await this.#processEpoch();
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }
};
